from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext, gettext_lazy as _
from .models import  Tournament, Contact, Participant, Course,Profile
from django.contrib.auth.models import User

@admin.register(Tournament)
class TournamentAdmin(admin.ModelAdmin):
    list_display = ('tournamentName', 'organizerName', 'category', 'mode', 'time', 'venue', 'batchSize', 'tournamentCode', 'participantLimit')
    search_fields = ('tournamentName', 'organizerName', 'category', 'mode')
    list_filter = ('category', 'mode')

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'country_code', 'whatsapp_number')
    search_fields = ('name', 'whatsapp_number')
    list_filter = ('country_code',)

@admin.register(Participant)
class ParticipantAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'phone_number', 'address','tournamentCode', 'join_date')
    search_fields = ('name', 'email','phone_number',  'tournamentCode')
    list_filter = ('tournamentCode',)

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'age', 'icon', 'path')
    search_fields = ('title', 'age')
    list_filter = ('age',)

class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'

class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInline,)

admin.site.unregister(User)
admin.site.register(User, UserAdmin)
