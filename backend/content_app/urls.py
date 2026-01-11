from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it
router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'tags', views.TagViewSet)
router.register(r'clients', views.ClientViewSet)
router.register(r'blog-posts', views.BlogPostViewSet)
router.register(r'case-studies', views.CaseStudyViewSet)
router.register(r'comments', views.CommentViewSet)

# The API URLs are now determined automatically by the router
urlpatterns = [
    path('', include(router.urls)),
] 