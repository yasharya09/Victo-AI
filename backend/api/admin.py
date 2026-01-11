from django.contrib import admin
from .models import Organization, UserProfile, SecurityIncident

@admin.register(Organization)
class OrganizationAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at', 'updated_at')
    search_fields = ('name', 'description')

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization', 'role', 'created_at')
    list_filter = ('role', 'organization')
    search_fields = ('user__username', 'user__email', 'role')

@admin.register(SecurityIncident)
class SecurityIncidentAdmin(admin.ModelAdmin):
    list_display = ('title', 'severity', 'status', 'organization', 'reported_by', 'created_at')
    list_filter = ('severity', 'status', 'organization')
    search_fields = ('title', 'description')
    date_hierarchy = 'created_at'
