from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

def health_check(request):
    return HttpResponse("healthy", content_type="text/plain")

schema_view = get_schema_view(
    openapi.Info(
        title="VICTO AI API",
        default_version='v1',
        description="API documentation for VICTO AI platform",
        terms_of_service="https://www.victoai.com/terms/",
        contact=openapi.Contact(email="contact@victoai.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('api.urls')),
    path('api/v1/', include('contact_app.urls')),
    path('api/v1/', include('content_app.urls')),
    path('api/v1/auth/', include('authentication.urls')),
    path('api/v1/health/', health_check, name='api_health_check'),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('health/', health_check, name='health_check'),
]

# Serve static/media files during development only
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
