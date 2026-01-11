from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ContactSerializer, NewsletterSubscriptionSerializer, DemoRequestSerializer, ConsultationRequestSerializer
from .models import ContactMessage, NewsletterSubscription, DemoRequest, ConsultationRequest
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class ContactAPIView(APIView):
    def post(self, request, *args, **kwargs):
        logger.info("Received new contact message request.")
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                logger.info(f"Contact message successfully saved from {serializer.validated_data['email']}.")
                return Response({'message': 'Your message has been sent successfully!'}, status=status.HTTP_200_OK)
            except Exception as e:
                logger.error(f"Error saving contact message from {serializer.validated_data.get('email', 'N/A')}: {str(e)}", exc_info=True)
                return Response(
                    {'error': 'Failed to save your message. Please try again.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        logger.warning(f"Invalid contact message data: {serializer.errors}")
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class NewsletterSubscriptionView(APIView):
    def post(self, request, *args, **kwargs):
        logger.info("Received new newsletter subscription request.")
        serializer = NewsletterSubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            try:
                subscription = serializer.save()
                logger.info(f"New newsletter subscription: {subscription.email} ({subscription.subscription_type}).")
                return Response({
                    'message': 'Successfully subscribed to our newsletter!',
                    'subscription_type': subscription.subscription_type
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error saving newsletter subscription for {serializer.validated_data.get('email', 'N/A')}: {str(e)}", exc_info=True)
                return Response(
                    {'error': 'Failed to subscribe. Please try again.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        logger.warning(f"Invalid newsletter subscription data: {serializer.errors}")
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        email = request.data.get('email')
        logger.info(f"Received newsletter unsubscription request for email: {email}")
        if not email:
            logger.warning("Unsubscription request missing email.")
            return Response(
                {'error': 'Email is required for unsubscription.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            subscription = NewsletterSubscription.objects.get(email=email, is_active=True)
            subscription.unsubscribe()
            logger.info(f"Newsletter successfully unsubscribed: {email}.")
            return Response({'message': 'Successfully unsubscribed from our newsletter.'})
        except NewsletterSubscription.DoesNotExist:
            logger.warning(f"Attempted unsubscription for non-existent or inactive email: {email}")
            return Response(
                {'error': 'No active subscription found for this email.'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            logger.error(f"Error processing unsubscription for {email}: {str(e)}", exc_info=True)
            return Response(
                {'error': 'Failed to unsubscribe. Please try again.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class DemoRequestView(APIView):
    def post(self, request, *args, **kwargs):
        logger.info("Received new demo request.")
        serializer = DemoRequestSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                logger.info(f"Demo request successfully saved from {serializer.validated_data['email']}.")
                return Response({'message': 'Your demo request has been sent successfully!'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error saving demo request from {serializer.validated_data.get('email', 'N/A')}: {str(e)}", exc_info=True)
                return Response(
                    {'error': 'Failed to save your demo request. Please try again.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        logger.warning(f"Invalid demo request data: {serializer.errors}")
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

class ConsultationRequestView(APIView):
    def post(self, request, *args, **kwargs):
        logger.info("Received new consultation request.")
        serializer = ConsultationRequestSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                logger.info(f"Consultation request successfully saved from {serializer.validated_data['email']}.")
                return Response({'message': 'Your consultation request has been sent successfully!'}, status=status.HTTP_201_CREATED)
            except Exception as e:
                logger.error(f"Error saving consultation request from {serializer.validated_data.get('email', 'N/A')}: {str(e)}", exc_info=True)
                return Response(
                    {'error': 'Failed to save your consultation request. Please try again.'},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                )
        logger.warning(f"Invalid consultation request data: {serializer.errors}")
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)