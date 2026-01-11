from django.urls import path
from .views import ContactAPIView, NewsletterSubscriptionView, DemoRequestView, ConsultationRequestView

urlpatterns = [
    path('contact/', ContactAPIView.as_view(), name='contact-api'),
    path('newsletter/', NewsletterSubscriptionView.as_view(), name='newsletter-api'),
    path('demo-request/', DemoRequestView.as_view(), name='demo-request-api'),
    path('consultation-request/', ConsultationRequestView.as_view(), name='consultation-request-api'),
]