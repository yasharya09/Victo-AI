from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth.models import User
from .models import (
    Organization, UserProfile, SecurityIncident,
    AIModel, SecurityScan, AuditLog
)
from datetime import timedelta
from django.utils import timezone

class BaseTestCase(APITestCase):
    def setUp(self):
        # Create test user
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        self.client = APIClient()
        self.client.force_authenticate(user=self.user)
        
        # Create test organization
        self.org = Organization.objects.create(
            name='Test Org',
            description='Test Organization'
        )
        
        # Create user profile
        self.profile = UserProfile.objects.create(
            user=self.user,
            organization=self.org,
            role='admin'
        )

class OrganizationTests(BaseTestCase):
    def test_create_organization(self):
        url = reverse('organization-list')
        data = {
            'name': 'New Org',
            'description': 'New Organization'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Organization.objects.count(), 2)

    def test_get_organization_statistics(self):
        url = reverse('organization-statistics', args=[self.org.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('total_incidents', response.data)

class SecurityIncidentTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.incident = SecurityIncident.objects.create(
            organization=self.org,
            title='Test Incident',
            description='Test Description',
            severity='high',
            status='open'
        )

    def test_create_incident(self):
        url = reverse('securityincident-list')
        data = {
            'organization': self.org.id,
            'title': 'New Incident',
            'description': 'New Description',
            'severity': 'medium',
            'status': 'open'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SecurityIncident.objects.count(), 2)

    def test_bulk_update_status(self):
        url = reverse('securityincident-bulk-update-status')
        data = {
            'incident_ids': [self.incident.id],
            'status': 'investigating'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.incident.refresh_from_db()
        self.assertEqual(self.incident.status, 'investigating')

class AIModelTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.model = AIModel.objects.create(
            organization=self.org,
            name='Test Model',
            description='Test Description',
            model_type='classification'
        )

    def test_create_model(self):
        url = reverse('aimodel-list')
        data = {
            'organization': self.org.id,
            'name': 'New Model',
            'description': 'New Description',
            'model_type': 'detection'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(AIModel.objects.count(), 2)

    def test_retrain_model(self):
        url = reverse('aimodel-retrain', args=[self.model.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class SecurityScanTests(BaseTestCase):
    def setUp(self):
        super().setUp()
        self.scan = SecurityScan.objects.create(
            organization=self.org,
            scan_type='vulnerability',
            status='running',
            start_time=timezone.now()
        )

    def test_create_scan(self):
        url = reverse('securityscan-list')
        data = {
            'organization': self.org.id,
            'scan_type': 'compliance',
            'status': 'pending'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SecurityScan.objects.count(), 2)

    def test_stop_scan(self):
        url = reverse('securityscan-stop-scan', args=[self.scan.id])
        response = self.client.post(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.scan.refresh_from_db()
        self.assertEqual(self.scan.status, 'stopped')

class UserProfileTests(BaseTestCase):
    def test_create_profile(self):
        new_user = User.objects.create_user(
            username='newuser',
            email='new@example.com',
            password='newpass123'
        )
        url = reverse('userprofile-list')
        data = {
            'user': new_user.id,
            'organization': self.org.id,
            'role': 'analyst'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(UserProfile.objects.count(), 2)

class AuditLogTests(BaseTestCase):
    def test_audit_log_creation(self):
        # Create an incident to trigger audit log
        url = reverse('securityincident-list')
        data = {
            'organization': self.org.id,
            'title': 'Audit Test',
            'description': 'Testing audit logs',
            'severity': 'low',
            'status': 'open'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        
        # Check if audit log was created
        self.assertTrue(AuditLog.objects.filter(
            user=self.user,
            action='create',
            model_name='SecurityIncident'
        ).exists())
