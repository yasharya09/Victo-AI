from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import WhoAmIView

router = DefaultRouter()
router.register(r'organizations', views.OrganizationViewSet)
router.register(r'models', views.AIModelViewSet)
router.register(r'scans', views.SecurityScanViewSet)
router.register(r'profiles', views.UserProfileViewSet, basename='profile')
router.register(r'incidents', views.SecurityIncidentViewSet, basename='incident')
router.register(r'audit-logs', views.AuditLogViewSet, basename='audit-log')

urlpatterns = [
    path('whoami/', WhoAmIView.as_view(), name='whoami'),
    path('', include(router.urls)),
] 