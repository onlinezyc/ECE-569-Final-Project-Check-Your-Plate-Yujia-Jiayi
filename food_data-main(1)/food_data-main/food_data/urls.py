from django.contrib import admin
from django.urls import path, include, re_path
from django.views.static import serve

from food_data import settings

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('food.urls')),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),

]
