from rest_framework import serializers
from .models import Tournament
from .models import Contact
from .models import Participant
from .models import Course
from .models import Profile
from .models import Pricing
from .models import Carousel
from .models import CustomUser
from .models import Link, Files, Video, Message,CourseRegistration,SupportSubmission
from django.contrib.auth.models import User
import datetime


class CarouselSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = ['image_path']

class PricingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pricing
        fields = '__all__'

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['phone', 'address']  

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = '__all__'

    def validate(self, data):
        if data['mode'] == 'online' and data.get('batchSize') is None:
            raise serializers.ValidationError("Batch size is required for online tournaments.")
        if data['mode'] == 'offline' and data.get('venue') is None:
            raise serializers.ValidationError("Venue is required for offline tournaments.")
        return data

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'        

class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__' 
    

class UserSerializer(serializers.ModelSerializer):
    confirmPassword = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'confirmPassword']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        if data['password'] != data['confirmPassword']:
            raise serializers.ValidationError({"confirmPassword": "Passwords do not match."})
        return data

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['phone']


class FilesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Files
        fields = ['id','pdf']
class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'icon', 'title', 'age', 'description', 'path'] 
    
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = '__all__'

class MessageSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")

    class Meta:
        model = Message
        fields = '__all__'        

class CourseRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseRegistration
        fields = '__all__'        

class SupportSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportSubmission
        fields = ['User_name',  'email', 'message']        