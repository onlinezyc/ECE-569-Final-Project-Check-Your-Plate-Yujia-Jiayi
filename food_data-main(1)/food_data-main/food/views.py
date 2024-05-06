import json
import time

from django.http import JsonResponse
from food.models import User, Food, Nutrient, FoodNutrient, Recipe, RecipeFood
from django.core import serializers
from django.db.models import Q
from django.core.cache import cache


def login(request):
    data = json.loads(request.body.decode('utf-8'))
    username = data.get('username')
    password = data.get('password')
    user = User.objects.filter(username=username, password=password).first()
    if not user:
        data = {
            'success': False,
            'msg': '用户不存在',
            'data': {}
        }
        return JsonResponse(data, safe=False)
    if user.username != username or user.password != password:
        data = {
            'success': False,
            'msg': '密码或密码错误',
            'data': {}
        }
        return JsonResponse(data, safe=False)
    data = {
        'success': True,
        'msg': '登录成功',
        'data': {
            'id': user.id,
        }
    }
    return JsonResponse(data, safe=False)


#  创建用户 注册
def register(request):
    data = json.loads(request.body.decode('utf-8'))
    username = data.get('username')
    password = data.get('password')
    phone = data.get('phone')
    email = data.get('email')
    user = User.objects.filter(username=username).first()
    if user:
        data = {
            'success': False,
            'msg': '用户名已存在',
            'data': {}
        }
        return JsonResponse(data, safe=False)
    user = User.objects.create(username=username, password=password, email=email, phone=phone)
    data = {
        'success': True,
        'msg': '注册成功',
        'data': {
            'id': user.id
        }
    }
    return JsonResponse(data, safe=False)


# 获取用户信息
def get_user(request):
    data = json.loads(request.body.decode('utf-8'))
    id = data.get('id')
    user = User.objects.filter(id=id).first()
    if not user:
        data = {
            'success': False,
            'msg': '用户不存在',
            'data': {}
        }
        return JsonResponse(data, safe=False)
    data = {
        'success': True,
        'msg': '获取用户信息成功',
        'data': serializers.serialize('python', [user])[0]
    }
    return JsonResponse(data, safe=False)


# 更新用户信息
def update_user(request):
    data = json.loads(request.body.decode('utf-8'))
    id = data.get('id')
    user = User.objects.filter(id=id).first()
    if not user:
        data = {
            'success': False,
            'msg': '用户不存在',
            'data': {}
        }
        return JsonResponse(data, safe=False)
    user.password = data.get('password')
    user.email = data.get('email')
    user.phone = data.get('phone')
    user.sex = data.get('sex')
    user.age = data.get('age')
    user.height = data.get('height')
    user.weight = data.get('weight')
    user.blood_pressure = data.get('blood_pressure')
    user.diabetes = data.get('diabetes')
    user.pregnancy = data.get('pregnancy')
    user.save()
    data = {
        'success': True,
        'msg': '更新用户信息成功',
        'data': serializers.serialize('python', [user])[0]
    }
    return JsonResponse(data, safe=False)


# 获取Recipe
def get_recipe(request):
    list = []
    for recipe in serializers.serialize('python', Recipe.objects.all()):
        amount = 0
        recipe_food = RecipeFood.objects.filter(recipe_id=recipe['pk'])
        for rf in recipe_food:
            food = Food.objects.filter(fdc_id=rf.food_id).first()
            food_amount = rf.amount
            food_nutrient = FoodNutrient.objects.filter(fdc_id=food.fdc_id)
            for fn in food_nutrient:
                nutrient = Nutrient.objects.filter(id=fn.nutrient_id).first()
                amount += fn.amount * food_amount

        list.append({
            'id': recipe['pk'],
            'amount': amount,  # 用于计算食谱的热量
            'name': recipe['fields']['name'],
            'description': recipe['fields']['description'],
            'author': recipe['fields']['author'],
            'create_time': recipe['fields']['create_time'].strftime("%Y-%m-%d %H:%M:%S"),
        })
    data = {
        'success': True,
        'msg': '获取成功',
        'data': list
    }
    return JsonResponse(data, safe=False)


# add_recipe
def add_recipe(request):
    data = json.loads(request.body.decode('utf-8'))
    name = data.get('name')
    description = data.get('description')
    author = data.get('author')
    create_time = time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(time.time()))
    recipe = Recipe.objects.create(name=name, description=description, author=author, create_time=create_time)
    data = {
        'success': True,
        'msg': '添加成功',
        'data': {
            'id': recipe.id
        }
    }
    return JsonResponse(data, safe=False)


# 获取食谱的food
def get_recipe_food(request):
    data = json.loads(request.body.decode('utf-8'))
    recipe_id = data.get('recipe_id')
    recipe_food = RecipeFood.objects.filter(recipe_id=recipe_id)
    list = []
    for rf in recipe_food:
        food = Food.objects.filter(fdc_id=rf.food_id).first()
        list.append({
            'fdc_id': food.fdc_id,
            'amount': rf.amount,
            'data_type': food.data_type,
            'description': food.description,
            'food_category_id': food.food_category_id,
            'publication_date': food.publication_date,
        })
    data = {
        'success': True,
        'msg': '获取成功',
        'data': list
    }
    return JsonResponse(data, safe=False)


# 获取食物 营养素
def get_food_nutrient(request):
    data = json.loads(request.body.decode('utf-8'))
    fdc_id = data.get('fdc_id')
    food_nutrient = FoodNutrient.objects.filter(fdc_id=fdc_id)
    list = []
    for fn in food_nutrient:
        nutrient = Nutrient.objects.filter(id=fn.nutrient_id).first()
        if not nutrient:
            continue
        list.append({
            'amount': fn.amount,
            'name': nutrient.name,
            'unit_name': nutrient.unit_name,
            'nutrient_nbr': nutrient.nutrient_nbr,
            'rank': nutrient.rank,
            'id': nutrient.id,
        })
    data = {
        'success': True,
        'msg': '获取成功',
        'data': list
    }
    return JsonResponse(data, safe=False)


# 搜索食物
def search_food(request):
    data = json.loads(request.body.decode('utf-8'))
    keyword = data.get('search')
    if cache.get(keyword):
        foods = cache.get(keyword)
    else:
        # 查询前30条数据
        foods = Food.objects.filter(description__icontains=keyword)[:30]
        cache.set(keyword, foods, 300)
    list = []
    for food in foods:
        list.append({
            'fdc_id': food.fdc_id,
            'data_type': food.data_type,
            'description': food.description,
            'food_category_id': food.food_category_id,
            'publication_date': food.publication_date,
        })
    data = {
        'success': True,
        'msg': '获取成功',
        'data': list
    }
    return JsonResponse(data, safe=False)


def add_recipe_food(request):
    data = json.loads(request.body.decode('utf-8'))
    recipe_id = data.get('recipe_id')
    food_id = data.get('fdc_id')
    amount = data.get('amount')
    #  查找是否已经存在
    recipe_food = RecipeFood.objects.filter(recipe_id=recipe_id, food_id=food_id).first()
    if recipe_food:
        data = {
            'success': True,
            'msg': '已经存在',
            'data': {}
        }
        return JsonResponse(data, safe=False)
    recipe_food = RecipeFood.objects.create(recipe_id=recipe_id, food_id=food_id, amount=amount)
    data = {
        'success': True,
        'msg': '添加成功',
        'data': {
            'id': recipe_food.id
        }
    }
    return JsonResponse(data, safe=False)
