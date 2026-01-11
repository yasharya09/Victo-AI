from rest_framework import serializers
from .models import ContactMessage, NewsletterSubscription, DemoRequest, ConsultationRequest

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactMessage
        fields = ['first_name', 'last_name', 'email', 'company', 'subject', 'message', 'privacy_policy_accepted']

class NewsletterSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterSubscription
        fields = ['email', 'subscription_type']
        extra_kwargs = {
            'subscription_type': {'required': False}  # Defaults to 'resources' in model
        }

    def validate_email(self, value):
        # Check if email is already subscribed
        if NewsletterSubscription.objects.filter(email=value, is_active=True).exists():
            raise serializers.ValidationError("This email is already subscribed to our newsletter.")
        return value

class DemoRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = DemoRequest
        fields = ['first_name', 'last_name', 'email', 'company', 'phone_number', 'message']
        extra_kwargs = {
            'phone_number': {'required': False},
            'message': {'required': False},
        }

class ConsultationRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConsultationRequest
        fields = ['first_name', 'last_name', 'email', 'company', 'phone_number', 'preferred_date', 'preferred_time', 'message']
        extra_kwargs = {
            'phone_number': {'required': False},
            'preferred_date': {'required': False},
            'preferred_time': {'required': False},
            'message': {'required': False},
        }