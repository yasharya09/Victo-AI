from django.shortcuts import render
from rest_framework import viewsets, permissions, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth.models import User
from django_filters.rest_framework import DjangoFilterBackend
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import (
    Organization,
    UserProfile,
    SecurityIncident,
    AIModel,
    SecurityScan,
    AuditLog
)
from .serializers import (
    UserSerializer,
    OrganizationSerializer,
    UserProfileSerializer,
    SecurityIncidentSerializer,
    AIModelSerializer,
    SecurityScanSerializer,
    AuditLogSerializer
)
from django.utils import timezone
from django.db.models import Count, Avg, Q
from datetime import timedelta
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

# Create your views here.

class OrganizationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing organizations.
    
    Provides CRUD operations for organizations and additional actions for
    retrieving incidents, models, and statistics.
    """
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['industry', 'size']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']

    @swagger_auto_schema(
        operation_description="Get all security incidents for a specific organization",
        responses={200: SecurityIncidentSerializer(many=True)}
    )
    @action(detail=True, methods=['get'])
    def incidents(self, request, pk=None):
        """
        Get all security incidents for a specific organization.
        """
        organization = self.get_object()
        incidents = SecurityIncident.objects.filter(organization=organization)
        serializer = SecurityIncidentSerializer(incidents, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Get all AI models for a specific organization",
        responses={200: AIModelSerializer(many=True)}
    )
    @action(detail=True, methods=['get'])
    def models(self, request, pk=None):
        """
        Get all AI models for a specific organization.
        """
        organization = self.get_object()
        models = AIModel.objects.filter(organization=organization)
        serializer = AIModelSerializer(models, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Get comprehensive statistics for a specific organization",
        responses={
            200: openapi.Response(
                description="Organization statistics",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'total_incidents': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'active_incidents': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'incidents_by_severity': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                        'recent_incidents': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'total_models': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'active_scans': openapi.Schema(type=openapi.TYPE_INTEGER),
                    }
                )
            )
        }
    )
    @action(detail=True, methods=['get'])
    def statistics(self, request, pk=None):
        """
        Get comprehensive statistics for a specific organization including:
        - Total and active security incidents
        - Incidents by severity
        - Recent incidents (last 30 days)
        - Total AI models
        - Active security scans
        """
        org = self.get_object()
        now = timezone.now()
        thirty_days_ago = now - timedelta(days=30)

        stats = {
            'total_incidents': SecurityIncident.objects.filter(organization=org).count(),
            'active_incidents': SecurityIncident.objects.filter(
                organization=org,
                status__in=['open', 'investigating']
            ).count(),
            'incidents_by_severity': SecurityIncident.objects.filter(
                organization=org
            ).values('severity').annotate(count=Count('id')),
            'recent_incidents': SecurityIncident.objects.filter(
                organization=org,
                created_at__gte=thirty_days_ago
            ).count(),
            'total_models': AIModel.objects.filter(organization=org).count(),
            'active_scans': SecurityScan.objects.filter(
                organization=org,
                status='running'
            ).count(),
        }
        return Response(stats)

class AIModelViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing AI models.
    
    Provides CRUD operations for AI models and additional actions for
    retrieving scans and incidents related to specific models.
    """
    queryset = AIModel.objects.all()
    serializer_class = AIModelSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['model_type', 'status']
    search_fields = ['name', 'description', 'version']
    ordering_fields = ['name', 'created_at']

    @swagger_auto_schema(
        operation_description="Get all security scans for a specific AI model",
        responses={200: SecurityScanSerializer(many=True)}
    )
    @action(detail=True, methods=['get'])
    def scans(self, request, pk=None):
        """
        Get all security scans performed on a specific AI model.
        """
        model = self.get_object()
        scans = SecurityScan.objects.filter(target_model=model)
        serializer = SecurityScanSerializer(scans, many=True)
        return Response(serializer.data)

    @swagger_auto_schema(
        operation_description="Get all security incidents related to a specific AI model",
        responses={200: SecurityIncidentSerializer(many=True)}
    )
    @action(detail=True, methods=['get'])
    def incidents(self, request, pk=None):
        """
        Get all security incidents related to a specific AI model.
        """
        model = self.get_object()
        incidents = SecurityIncident.objects.filter(affected_model=model)
        serializer = SecurityIncidentSerializer(incidents, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def retrain(self, request, pk=None):
        """Trigger model retraining"""
        model = self.get_object()
        # Add your retraining logic here
        return Response({'status': 'retraining started'})

    @action(detail=True, methods=['get'])
    def performance_metrics(self, request, pk=None):
        """Get model performance metrics"""
        model = self.get_object()
        # Add your metrics calculation logic here
        return Response({
            'accuracy': 0.95,
            'precision': 0.94,
            'recall': 0.93,
            'f1_score': 0.94
        })

class SecurityScanViewSet(viewsets.ModelViewSet):
    queryset = SecurityScan.objects.all()
    serializer_class = SecurityScanSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['scan_type', 'status']
    search_fields = ['target_model__name']
    ordering_fields = ['created_at', 'completed_at']

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=True, methods=['post'])
    def start_scan(self, request, pk=None):
        scan = self.get_object()
        if scan.status != 'pending':
            return Response(
                {'error': 'Scan can only be started if it is in pending status'},
                status=status.HTTP_400_BAD_REQUEST
            )
        scan.status = 'running'
        scan.started_at = timezone.now()
        scan.save()
        return Response({'status': 'scan started'})

    @action(detail=True, methods=['post'])
    def complete_scan(self, request, pk=None):
        scan = self.get_object()
        if scan.status != 'running':
            return Response(
                {'error': 'Scan can only be completed if it is running'},
                status=status.HTTP_400_BAD_REQUEST
            )
        scan.status = 'completed'
        scan.completed_at = timezone.now()
        scan.findings = request.data.get('findings', {})
        scan.save()
        return Response({'status': 'scan completed'})

    @action(detail=True, methods=['post'])
    def stop_scan(self, request, pk=None):
        """Stop a running scan"""
        scan = self.get_object()
        if scan.status != 'running':
            return Response(
                {'error': 'Scan is not running'},
                status=400
            )
        scan.status = 'stopped'
        scan.save()
        return Response({'status': 'scan stopped'})

    @action(detail=False, methods=['get'])
    def scan_statistics(self, request):
        """Get scan statistics"""
        stats = {
            'total_scans': SecurityScan.objects.count(),
            'scans_by_status': SecurityScan.objects.values('status')
                .annotate(count=Count('id')),
            'average_duration': SecurityScan.objects.filter(
                status='completed'
            ).aggregate(avg_duration=Avg('duration'))['avg_duration'],
        }
        return Response(stats)

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['role', 'organization']
    search_fields = ['user__username', 'user__email', 'department']

    def get_queryset(self):
        # For schema generation, return all objects to avoid issues with AnonymousUser
        if getattr(self, 'swagger_fake_view', False):
            return UserProfile.objects.all()
        return UserProfile.objects.filter(user=self.request.user)

class SecurityIncidentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing security incidents.
    
    Provides CRUD operations for security incidents and additional actions for
    assignment, bulk updates, and dashboard data retrieval.
    """
    queryset = SecurityIncident.objects.all()
    serializer_class = SecurityIncidentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['severity', 'status', 'organization']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'severity']

    def get_queryset(self):
        if getattr(self, 'swagger_fake_view', False):
            return SecurityIncident.objects.none()
        user_profile = UserProfile.objects.get(user=self.request.user)
        return SecurityIncident.objects.filter(organization=user_profile.organization)

    def perform_create(self, serializer):
        user_profile = UserProfile.objects.get(user=self.request.user)
        serializer.save(
            organization=user_profile.organization,
            reported_by=self.request.user
        )

    @swagger_auto_schema(
        operation_description="Assign a security incident to a specific user",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['user_id'],
            properties={
                'user_id': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID of the user to assign the incident to')
            }
        ),
        responses={
            200: openapi.Response(description="Incident assigned successfully", schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={'status': openapi.Schema(type=openapi.TYPE_STRING)}
            )),
            404: openapi.Response(description="User not found", schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={'error': openapi.Schema(type=openapi.TYPE_STRING)}
            ))
        }
    )
    @action(detail=True, methods=['post'])
    def assign(self, request, pk=None):
        """
        Assign a security incident to a specific user.
        """
        incident = self.get_object()
        user_id = request.data.get('user_id')
        try:
            user = User.objects.get(id=user_id)
            incident.assigned_to = user
            incident.save()
            return Response({'status': 'incident assigned'})
        except User.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @swagger_auto_schema(
        operation_description="Bulk update the status of multiple security incidents",
        request_body=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            required=['incident_ids', 'status'],
            properties={
                'incident_ids': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_INTEGER), description='List of incident IDs to update'),
                'status': openapi.Schema(type=openapi.TYPE_STRING, description='New status to set for the incidents')
            }
        ),
        responses={
            200: openapi.Response(description="Status updated successfully", schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={'updated': openapi.Schema(type=openapi.TYPE_INTEGER, description='Number of incidents updated')}
            )),
            400: openapi.Response(description="Bad request", schema=openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={'error': openapi.Schema(type=openapi.TYPE_STRING)}
            ))
        }
    )
    @action(detail=False, methods=['post'])
    def bulk_update_status(self, request):
        """
        Bulk update the status of multiple security incidents.
        """
        incident_ids = request.data.get('incident_ids', [])
        new_status = request.data.get('status')
        
        if not incident_ids or not new_status:
            return Response(
                {'error': 'incident_ids and status are required'},
                status=400
            )
            
        incidents = SecurityIncident.objects.filter(id__in=incident_ids)
        incidents.update(status=new_status)
        
        return Response({'updated': len(incident_ids)})

    @swagger_auto_schema(
        operation_description="Get comprehensive dashboard statistics for security incidents",
        responses={
            200: openapi.Response(
                description="Dashboard data",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'incidents_by_status': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                        'incidents_by_severity': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                        'recent_incidents': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                        'incident_trend': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
                    }
                )
            )
        }
    )
    @action(detail=False, methods=['get'])
    def dashboard_data(self, request):
        """
        Get comprehensive dashboard statistics for security incidents including:
        - Incidents by status
        - Incidents by severity
        - Recent incidents (last 5)
        - Incident trend over the last 30 days
        """
        now = timezone.now()
        thirty_days_ago = now - timedelta(days=30)
        
        data = {
            'incidents_by_status': SecurityIncident.objects.values('status')
                .annotate(count=Count('id')),
            'incidents_by_severity': SecurityIncident.objects.values('severity')
                .annotate(count=Count('id')),
            'recent_incidents': SecurityIncident.objects.filter(
                created_at__gte=thirty_days_ago
            ).order_by('-created_at')[:5],
            'incident_trend': SecurityIncident.objects.filter(
                created_at__gte=thirty_days_ago
            ).extra(
                select={'day': 'date(created_at)'}
            ).values('day').annotate(count=Count('id')),
        }
        return Response(data)

class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing audit logs.
    
    Provides read-only access to audit logs for tracking user actions
    and system changes within the organization.
    """
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['action', 'model_name']
    search_fields = ['user__username', 'details']
    ordering_fields = ['created_at']

    def get_queryset(self):
        # Fix for Swagger schema generation
        if getattr(self, 'swagger_fake_view', False):
            return AuditLog.objects.none()
        user_profile = UserProfile.objects.get(user=self.request.user)
        return AuditLog.objects.filter(organization=user_profile.organization)

class WhoAmIView(APIView):
    """
    API view for getting current user information.
    
    Returns basic information about the authenticated user.
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        operation_description="Get current authenticated user information",
        responses={
            200: openapi.Response(
                description="User information",
                schema=openapi.Schema(
                    type=openapi.TYPE_OBJECT,
                    properties={
                        'id': openapi.Schema(type=openapi.TYPE_INTEGER),
                        'username': openapi.Schema(type=openapi.TYPE_STRING),
                        'email': openapi.Schema(type=openapi.TYPE_STRING),
                        'first_name': openapi.Schema(type=openapi.TYPE_STRING),
                        'last_name': openapi.Schema(type=openapi.TYPE_STRING),
                    }
                )
            )
        }
    )
    def get(self, request):
        """
        Get current authenticated user information.
        """
        user = request.user
        return Response({
            'id': user.id,
            'username': user.username,
            'email': user.email,
            'is_staff': user.is_staff,
            'is_superuser': user.is_superuser,
        })

