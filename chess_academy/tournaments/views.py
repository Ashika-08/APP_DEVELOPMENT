from rest_framework import status,permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from django.conf import settings

from rest_framework import viewsets
from .models import Tournament, Contact, Participant, Course,Profile,Pricing,Carousel,Link, Files, Video, Message,CourseRegistration,SupportSubmission
from .serializers import TournamentSerializer, ContactSerializer, ParticipantSerializer, CourseSerializer, UserSerializer,ProfileSerializer,PricingSerializer,CarouselSerializer,LinkSerializer, FilesSerializer, VideoSerializer, MessageSerializer,CourseRegistrationSerializer,SupportSubmissionSerializer
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from .models import CustomUser
from .serializers import UserProfileSerializer
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from rest_framework.parsers import MultiPartParser, FormParser
import logging
from django.core.mail import send_mail
from .serializers import CourseSerializer
import json
from rest_framework.generics import UpdateAPIView
logger = logging.getLogger(__name__)

class UpdateProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, user_id, format=None):
        try:
            user = CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def get(self, request, user_id, format=None):
        try:
            user = CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
class CarouselView(APIView):
    permission_classes = [AllowAny]
    def get(self, request, *args, **kwargs):
        images = Carousel.objects.all()
        serializer = CarouselSerializer(images, many=True)
        return Response(serializer.data)
    def post(self, request, *args, **kwargs):
        data = request.data
        if not isinstance(data, list):
            return Response({'non_field_errors': 'Invalid data. Expected a list.'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = CarouselSerializer(data=data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PricingViewSet(viewsets.ModelViewSet):
    queryset = Pricing.objects.all()
    serializer_class = PricingSerializer
    permission_classes = [AllowAny]

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [AllowAny]

class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]

class ParticipantViewSet(viewsets.ModelViewSet):
    queryset = Participant.objects.all()
    serializer_class = ParticipantSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            participant = serializer.save()
            tournament_code = request.data.get('tournamentCode')
            try:
                tournament = Tournament.objects.get(tournamentCode=tournament_code)
                participants = tournament.participants or []
                participants.append({
                    'name': participant.name,
                    'email': participant.email,
                    'phone_number': participant.phone_number,
                    'address': participant.address
                })
                tournament.participants = participants
                tournament.save()
                return Response({
                    'message': 'Participant added successfully.',
                    'participant': serializer.data
                }, status=status.HTTP_201_CREATED)
            except Tournament.DoesNotExist:
                return Response({"error": "Tournament does not exist."}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        print('Request data:', request.data)  # Log the request data
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('Errors:', serializer.errors)  # Log errors if any
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            return Response({
                'user': serializer.data,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def validate_credentials(request):
    try:
        email = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"detail": "Invalid email."}, status=status.HTTP_401_UNAUTHORIZED)

        user = authenticate(username=user.username, password=password)

        if user is not None:
            user_serializer = UserSerializer(user)
            return Response({
                "detail": "Credentials are valid.",
                "user": user_serializer.data,
            }, status=status.HTTP_200_OK)
        else:
            return Response({"detail": "Invalid password."}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({"detail": f"An error occurred: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# class UserDetailsView(APIView):
#     permission_classes = [IsAuthenticated]
#     def get(self, request, *args, **kwargs):
#         user_id = request.GET.get('user_id')
        
#         if not user_id or not user_id.isdigit():
#             return JsonResponse({'error': 'Invalid or missing user_id'}, status=400)
        
#         try:
#             user = User.objects.get(id=user_id)
#             # Serialize and return user details here
#             return JsonResponse({'id': user.ID, 'name': user.name, 'email': user.email})
#         except ObjectDoesNotExist:
#             return JsonResponse({'error': 'User not found'}, status=404)
        
class UserDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = request.GET.get('user_id')
        
        if not user_id or not user_id.isdigit():
            return JsonResponse({'error': 'Invalid or missing user_id'}, status=400)
        
        try:
            user = User.objects.get(id=user_id)
            # Serialize and return user details here
            return JsonResponse({'id': user.id, 'username': user.username, 'email': user.email})
        except User.DoesNotExist:
            return JsonResponse({'error': 'User not found'}, status=404)


    
@login_required
def get_classroom_link(request):
    user = request.user
    if user.email.endswith('@knightspath.in'):
        return JsonResponse({'link': '/ins'})
    else:
        return JsonResponse({'link': '/stu'})
    

class LinkViewSet(viewsets.ModelViewSet):
    queryset = Link.objects.all().order_by('-created_at')
    serializer_class = LinkSerializer
    permission_classes = [AllowAny] 


class FilesViewSet(viewsets.ModelViewSet):
    queryset = Files.objects.all()
    serializer_class = FilesSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors) 
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all().order_by('-created_at')
    serializer_class = VideoSerializer
    permission_classes = [AllowAny]

class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all().order_by('-created_at')
    serializer_class = MessageSerializer  
    permission_classes = [AllowAny]

@api_view(['GET'])
def course_list(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)  

class CourseRegistrationCreate(generics.CreateAPIView):
    queryset = CourseRegistration.objects.all()
    serializer_class = CourseRegistrationSerializer    
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        
        response_data = {
            "message": "Registration successful! We will get back to you shortly through phone or email along with payment details.",
            "data": serializer.data
        }
        return Response(response_data, status=status.HTTP_201_CREATED)


class SupportFormView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        
        # Save the data to the database
        support_message = SupportSubmission.objects.create(
            User_name=data.get('firstName'),  # Correct field name
            email=data.get('email'),
            message=data.get('message')
        )

        
        return Response({'message': 'Message sent successfully!'}, status=status.HTTP_200_OK)
class FAQView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        # Extract user email from the form data
        user_email = data.get('email')
        
        # Process the data (e.g., save to the database or perform other actions)
        
        # Send a confirmation email
        send_mail(
            subject='Thank you for contacting Knight\'s Path',
            message='Thank you for reaching out to us. We will get back to you shortly.',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user_email],
            fail_silently=False,
        )
        
        return Response({'message': 'Messages sent successfully!'}, status=status.HTTP_200_OK)
