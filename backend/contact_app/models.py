from django.db import models
from django.utils import timezone

# Create your models here.

class ContactMessage(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(db_index=True)
    company = models.CharField(max_length=200, blank=True, null=True)
    subject = models.CharField(max_length=50)
    message = models.TextField()
    privacy_policy_accepted = models.BooleanField(default=False)
    submitted_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        ordering = ['-submitted_at']

    def __str__(self):
        return f"Message from {self.first_name} {self.last_name} ({self.email})"

class NewsletterSubscription(models.Model):
    email = models.EmailField(unique=True, db_index=True)
    subscription_type = models.CharField(
        max_length=20,
        choices=[
            ('investors', 'Investors'),
            ('resources', 'Resources'),
        ],
        default='resources'
    )
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)
    last_email_sent = models.DateTimeField(null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)  # For storing additional data like source, preferences, etc.

    class Meta:
        ordering = ['-subscribed_at']
        indexes = [
            models.Index(fields=['email', 'subscription_type']),
            models.Index(fields=['is_active', 'subscription_type']),
        ]

    def __str__(self):
        return f"{self.email} ({self.subscription_type})"

    def unsubscribe(self):
        self.is_active = False
        self.unsubscribed_at = timezone.now()
        self.save()

class DemoRequest(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(db_index=True)
    company = models.CharField(max_length=200, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    requested_at = models.DateTimeField(auto_now_add=True, db_index=True)
    is_processed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-requested_at']

    def __str__(self):
        return f"Demo Request from {self.first_name} {self.last_name} ({self.email})"

class ConsultationRequest(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(db_index=True)
    company = models.CharField(max_length=200, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    preferred_date = models.DateField(null=True, blank=True)
    preferred_time = models.CharField(max_length=50, blank=True, null=True)
    message = models.TextField(blank=True, null=True)
    requested_at = models.DateTimeField(auto_now_add=True, db_index=True)
    is_processed = models.BooleanField(default=False)

    class Meta:
        ordering = ['-requested_at']

    def __str__(self):
        return f"Consultation Request from {self.first_name} {self.last_name} ({self.email})"