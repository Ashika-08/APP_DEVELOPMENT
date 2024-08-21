from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserRegistrationView, 
    TournamentViewSet, 
    ContactViewSet, 
    ParticipantViewSet, 
    CourseViewSet,
    validate_credentials,
    UpdateProfileView,  # Changed to use class-based view
    PricingViewSet,
    CarouselView,
    UserDetailsView,
    get_classroom_link,
    LinkViewSet,
    FilesViewSet,
    VideoViewSet,
    MessageViewSet,
    CourseRegistrationCreate,
    SupportFormView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'tournaments', TournamentViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'participants', ParticipantViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'pricing', PricingViewSet)
router.register(r'links', LinkViewSet)
router.register('files', FilesViewSet, basename='files')
router.register(r'videos', VideoViewSet)
router.register(r'msgs', MessageViewSet)

urlpatterns = [
    path('cregister/', CourseRegistrationCreate.as_view(), name='registration-create'),
    path('carousel/', CarouselView.as_view(), name='carousel-list'),
    path('update-profile/<int:user_id>/', UpdateProfileView.as_view(), name='update-profile-by-id'),  # Updated to use class-based view
    path('validate-credentials/', validate_credentials, name='validate-credentials'),
    path('register/', UserRegistrationView.as_view(), name='user-registration'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-details/', UserDetailsView.as_view(), name='user-details'),
    path('api/get_classroom_link/', get_classroom_link, name='get_classroom_link'),
    path('api/courses/', views.course_list, name='course-list'),
    path('faq/', SupportFormView.as_view(), name='support-form'),
    path('', include(router.urls)),
]


