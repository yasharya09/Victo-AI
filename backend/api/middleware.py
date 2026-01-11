"""
Custom middleware for VICTO AI Backend.

This module provides middleware for:
- Request logging and monitoring
- Security headers
- Rate limiting
- Performance monitoring
"""

import time
import logging
import hashlib
from django.http import HttpRequest, HttpResponse, JsonResponse
from django.conf import settings
from django.core.cache import cache
from django.utils.deprecation import MiddlewareMixin
from django.core.exceptions import PermissionDenied
from django.utils import timezone

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(MiddlewareMixin):
    """
    Middleware for logging all HTTP requests with performance metrics.
    """
    
    def process_request(self, request: HttpRequest) -> None:
        """Log request start and store start time."""
        request.start_time = time.time()
        request.request_id = self._generate_request_id()
        
        # Log request details
        logger.info(
            f"Request started - ID: {request.request_id} | "
            f"Method: {request.method} | "
            f"Path: {request.path} | "
            f"User: {request.user.username if request.user.is_authenticated else 'Anonymous'} | "
            f"IP: {self._get_client_ip(request)}"
        )
    
    def process_response(self, request: HttpRequest, response: HttpResponse) -> HttpResponse:
        """Log response details and performance metrics."""
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            
            # Log response details
            logger.info(
                f"Request completed - ID: {getattr(request, 'request_id', 'N/A')} | "
                f"Status: {response.status_code} | "
                f"Duration: {duration:.3f}s | "
                f"Size: {len(response.content) if hasattr(response, 'content') else 'N/A'} bytes"
            )
            
            # Add performance headers
            response['X-Request-ID'] = getattr(request, 'request_id', 'N/A')
            response['X-Response-Time'] = f"{duration:.3f}s"
            
            # Log slow requests
            if duration > 1.0:  # Log requests taking more than 1 second
                logger.warning(
                    f"Slow request detected - ID: {getattr(request, 'request_id', 'N/A')} | "
                    f"Duration: {duration:.3f}s | "
                    f"Path: {request.path}"
                )
        
        return response
    
    def process_exception(self, request: HttpRequest, exception: Exception) -> None:
        """Log exceptions with request context."""
        duration = time.time() - getattr(request, 'start_time', time.time())
        
        logger.error(
            f"Request exception - ID: {getattr(request, 'request_id', 'N/A')} | "
            f"Exception: {type(exception).__name__}: {str(exception)} | "
            f"Duration: {duration:.3f}s | "
            f"Path: {request.path} | "
            f"User: {request.user.username if request.user.is_authenticated else 'Anonymous'}"
        )
    
    def _generate_request_id(self) -> str:
        """Generate a unique request ID."""
        import uuid
        return str(uuid.uuid4())
    
    def _get_client_ip(self, request: HttpRequest) -> str:
        """Get the real client IP address."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR', 'unknown')
        return ip


class SecurityHeadersMiddleware(MiddlewareMixin):
    """
    Middleware for adding security headers to all responses.
    """
    
    def process_response(self, request: HttpRequest, response: HttpResponse) -> HttpResponse:
        """Add security headers to the response."""
        
        # Security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        # Content Security Policy (if not already set)
        if 'Content-Security-Policy' not in response:
            response['Content-Security-Policy'] = self._get_csp_policy()
        
        # HSTS header (only for HTTPS)
        if request.is_secure():
            response['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
        
        # Remove server header
        if 'Server' in response:
            del response['Server']
        
        return response
    
    def _get_csp_policy(self) -> str:
        """Get Content Security Policy string."""
        return (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
            "style-src 'self' 'unsafe-inline'; "
            "img-src 'self' data: https:; "
            "font-src 'self' data:; "
            "connect-src 'self' https:; "
            "frame-ancestors 'none';"
        )


class RateLimitMiddleware(MiddlewareMixin):
    """
    Middleware for implementing IP-based rate limiting.
    """
    
    def process_request(self, request: HttpRequest) -> HttpResponse:
        """Check rate limits before processing request."""
        client_ip = self._get_client_ip(request)
        rate_limit_key = f"rate_limit:{client_ip}"
        
        # Get current request count
        current_count = cache.get(rate_limit_key, 0)
        
        # Check if rate limit exceeded (100 requests per minute)
        if current_count >= 100:
            logger.warning(f"Rate limit exceeded for IP: {client_ip}")
            return JsonResponse(
                {'error': 'Rate limit exceeded. Please try again later.'},
                status=429
            )
        
        # Increment request count
        cache.set(rate_limit_key, current_count + 1, 60)  # 60 seconds TTL
        
        return None
    
    def _get_client_ip(self, request: HttpRequest) -> str:
        """Get the real client IP address."""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR', 'unknown')
        return ip


class PerformanceMonitoringMiddleware(MiddlewareMixin):
    """
    Middleware for monitoring request performance and adding performance headers.
    """
    
    def process_request(self, request: HttpRequest) -> None:
        """Store request start time for performance monitoring."""
        request.start_time = time.time()
    
    def process_response(self, request: HttpRequest, response: HttpResponse) -> HttpResponse:
        """Add performance monitoring headers."""
        if hasattr(request, 'start_time'):
            duration = time.time() - request.start_time
            response['X-Request-Duration'] = f"{duration:.3f}s"
            
            # Add performance warnings for slow requests
            if duration > 2.0:
                response['X-Performance-Warning'] = 'Slow request detected'
        
        return response


class ErrorHandlingMiddleware(MiddlewareMixin):
    """
    Middleware for providing consistent error responses.
    """
    
    def process_exception(self, request: HttpRequest, exception: Exception) -> HttpResponse:
        """Handle exceptions and provide consistent error responses."""
        
        if isinstance(exception, PermissionDenied):
            return JsonResponse(
                {'error': 'Permission denied'},
                status=403
            )
        
        # Log the exception
        logger.error(
            f"Unhandled exception in {request.path}: {type(exception).__name__}: {str(exception)}"
        )
        
        # Return generic error response
        return JsonResponse(
            {'error': 'Internal server error'},
            status=500
        )


class CachingMiddleware(MiddlewareMixin):
    """
    Middleware for implementing intelligent response caching.
    """
    
    def process_response(self, request: HttpRequest, response: HttpResponse) -> HttpResponse:
        """Add caching headers for GET requests."""
        
        # Only cache GET requests
        if request.method == 'GET' and response.status_code == 200:
            # Add cache control headers
            response['Cache-Control'] = 'public, max-age=300'  # 5 minutes
            response['ETag'] = self._generate_etag(response.content)
        
        return response
    
    def _generate_etag(self, content: bytes) -> str:
        """Generate ETag for content."""
        return hashlib.md5(content).hexdigest() 