from django.urls import path

from food.views import *

urlpatterns = [
    path('login', login),
    path('register', register),
    path('get_user', get_user),
    path('update_user', update_user),
    path('get_recipe', get_recipe),
    path('add_recipe', add_recipe),
    path('get_recipe_food', get_recipe_food),
    path('get_food_nutrient', get_food_nutrient),
    path('search_food', search_food),
    path('add_recipe_food', add_recipe_food),

]
