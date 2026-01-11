from rest_framework import viewsets, permissions, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Q
from django.utils import timezone
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .models import (
    Category, Tag, BlogPost, CaseStudy,
    Client, Comment
)
from .serializers import (
    CategorySerializer, TagSerializer, BlogPostSerializer,
    CaseStudySerializer, ClientSerializer, CommentSerializer,
    BlogPostListSerializer, CaseStudyListSerializer
)
from .permissions import IsAdminOrReadOnly, IsAuthorOrReadOnly

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.filter(is_active=True)
    serializer_class = CategorySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'order']
    ordering = ['order', 'name']

class TagViewSet(viewsets.ModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description']

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.filter(is_active=True)
    serializer_class = ClientSerializer
    permission_classes = [IsAdminOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']

class BlogPostViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing blog posts.
    
    Provides CRUD operations for blog posts with additional actions for
    view tracking, featured posts, and category filtering.
    """
    queryset = BlogPost.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['created_at', 'published_at', 'views']
    ordering = ['-published_at', '-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return BlogPostListSerializer
        return BlogPostSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(
                Q(is_published=True) & 
                Q(published_at__lte=timezone.now())
            )
        return queryset

    @swagger_auto_schema(
        operation_description="Increment the view count for a blog post",
        responses={200: openapi.Response(description="Views incremented successfully", schema=openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={'status': openapi.Schema(type=openapi.TYPE_STRING)}
        ))}
    )
    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """
        Increment the view count for a blog post.
        """
        blog_post = self.get_object()
        blog_post.increment_views()
        return Response({'status': 'views incremented'})

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_posts = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_category(self, request):
        category_slug = request.query_params.get('category')
        if not category_slug:
            return Response(
                {'error': 'Category slug is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        category = get_object_or_404(Category, slug=category_slug)
        posts = self.get_queryset().filter(categories=category)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)

class CaseStudyViewSet(viewsets.ModelViewSet):
    queryset = CaseStudy.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'excerpt']
    ordering_fields = ['created_at', 'published_at', 'views']
    ordering = ['-published_at', '-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return CaseStudyListSerializer
        return CaseStudySerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(
                Q(is_published=True) & 
                Q(published_at__lte=timezone.now())
            )
        return queryset

    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        case_study = self.get_object()
        case_study.increment_views()
        return Response({'status': 'views incremented'})

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_studies = self.get_queryset().filter(featured=True)
        serializer = self.get_serializer(featured_studies, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_industry(self, request):
        industry_slug = request.query_params.get('industry')
        if not industry_slug:
            return Response(
                {'error': 'Industry slug is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        industry = get_object_or_404(Category, slug=industry_slug)
        studies = self.get_queryset().filter(industry=industry)
        serializer = self.get_serializer(studies, many=True)
        return Response(serializer.data)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        queryset = super().get_queryset()
        if not self.request.user.is_staff:
            queryset = queryset.filter(is_approved=True)
        return queryset

    def perform_create(self, serializer):
        serializer.save(
            author=self.request.user,
            ip_address=self.request.META.get('REMOTE_ADDR'),
            user_agent=self.request.META.get('HTTP_USER_AGENT', '')
        )

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        if not request.user.is_staff:
            return Response(
                {'error': 'Only staff members can approve comments'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        comment = self.get_object()
        comment.is_approved = True
        comment.save()
        return Response({'status': 'comment approved'})

    @action(detail=True, methods=['post'])
    def mark_spam(self, request, pk=None):
        if not request.user.is_staff:
            return Response(
                {'error': 'Only staff members can mark comments as spam'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        comment = self.get_object()
        comment.is_spam = True
        comment.is_approved = False
        comment.save()
        return Response({'status': 'comment marked as spam'})