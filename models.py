from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User

class CustomUser(AbstractUser):
    phone = models.CharField(max_length=15, blank=True, null=True)
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions'
    )

class Profile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    phone = models.CharField(max_length=15, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=CustomUser)  # Updated to listen for CustomUser
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()

class Tournament(models.Model):
    tournamentName = models.CharField(max_length=100)
    organizerName = models.CharField(max_length=100)
    category = models.CharField(max_length=50,choices=[('under 10', 'under 10'), ('under 18', 'under 18')])
    mode = models.CharField(max_length=10, choices=[('online', 'Online'), ('offline', 'Offline')])
    time = models.TimeField()
    venue = models.CharField(max_length=200, blank=True, null=True)
    batchSize = models.IntegerField(blank=True, null=True)
    tournamentCode = models.CharField(max_length=10)
    participantLimit = models.IntegerField()
    participants = models.JSONField(default=list)

    def __str__(self):
        return self.tournamentName

class Contact(models.Model):
    name = models.CharField(max_length=100)
    country_code = models.CharField(max_length=5, default='IN')
    whatsapp_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.name} ({self.country_code})"
    
class Participant(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_number = models.CharField(max_length=15, unique=True, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    tournamentCode = models.CharField(max_length=10)
    join_date = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'TournamentParticipants'

    def __str__(self):
        return f"{self.name} - {self.tournamentCode}"
    
class Course(models.Model):
    icon = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    age = models.CharField(max_length=50)
    description = models.TextField()
    path = models.CharField(max_length=200)

    def __str__(self):
        return self.title
    
class Pricing(models.Model):
    plan_name = models.CharField(max_length=100)
    plan_duration = models.CharField(max_length=50)
    features = models.JSONField()
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2)
    original_price = models.DecimalField(max_digits=10, decimal_places=2)
    savings = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.plan_name
    
class Carousel(models.Model):
    image_path = models.CharField(max_length=255)

    def __str__(self):
        return self.image_path   

class Link(models.Model):
    url = models.URLField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.url

class Files(models.Model):
    pdf = models.FileField(upload_to='store/pdfs/')

    def __str__(self):
        return self.pdf.name

class Video(models.Model):
    title = models.CharField(max_length=100)
    video = models.FileField(upload_to='videos/')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Message(models.Model):
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message

class CourseRegistration(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    pricing = models.ForeignKey(Pricing, on_delete=models.CASCADE)
    interests = models.JSONField()
    agree_to_terms = models.BooleanField(default=False)
    registered_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.course.title}"

class SupportSubmission(models.Model):
    User_name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.User_name} - {self.email}'  