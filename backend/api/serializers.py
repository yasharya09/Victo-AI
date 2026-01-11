from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Organization,
    UserProfile,
    SecurityIncident,
    AIModel,
    SecurityScan,
    AuditLog
)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        ref_name = "ApiUserSerializer"

class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = '__all__'

class AIModelSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True)

    class Meta:
        model = AIModel
        fields = '__all__'

class SecurityScanSerializer(serializers.ModelSerializer):
    target_model = AIModelSerializer(read_only=True)
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = SecurityScan
        fields = '__all__'

class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    organization = OrganizationSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'

class SecurityIncidentSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True)
    affected_model = AIModelSerializer(read_only=True)
    reported_by = UserSerializer(read_only=True)
    assigned_to = UserSerializer(read_only=True)

    class Meta:
        model = SecurityIncident
        fields = '__all__'

class AuditLogSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = AuditLog
        fields = '__all__' 