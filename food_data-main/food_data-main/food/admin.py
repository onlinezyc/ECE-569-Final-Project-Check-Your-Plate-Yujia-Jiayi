from django.contrib import admin

from food.models import *

# Register your models here.


admin.site.site_header = 'project'
admin.site.site_title = 'project'
admin.site.index_title = 'backend management'


@admin.register(Nutrient)
class NutrientAdmin(admin.ModelAdmin):
    lists = []
    for f in Nutrient._meta.fields:
        lists.append(f.name)
    list_display = lists
    search_fields = ['id', 'name']
    pass


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    lists = []
    for f in User._meta.fields:
        lists.append(f.name)
    list_display = lists
    pass


@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    lists = []
    for f in Recipe._meta.fields:
        lists.append(f.name)
    list_display = lists
    pass


@admin.register(RecipeFood)
class RecipeFoodAdmin(admin.ModelAdmin):
    lists = []
    for f in RecipeFood._meta.fields:
        lists.append(f.name)
    list_display = lists
    pass


@admin.register(Food)
class FoodAdmin(admin.ModelAdmin):
    lists = []
    for f in Food._meta.fields:
        lists.append(f.name)
    list_display = lists
    search_fields = ['description']
    pass


@admin.register(FoodNutrient)
class FoodNutrientAdmin(admin.ModelAdmin):
    lists = []
    for f in FoodNutrient._meta.fields:
        lists.append(f.name)
    list_display = lists
    search_fields = ['fdc_id', 'nutrient_id']
    pass

# 注册模型到管理界面
# @admin.register(AcquisitionSamples)
# class AcquisitionSamplesAdmin(admin.ModelAdmin):
#     lists = []
#     for f in AcquisitionSamples._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(AgriculturalSamples)
# class AgriculturalSamplesAdmin(admin.ModelAdmin):
#     lists = []
#     for f in AgriculturalSamples._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(Food)
# class FoodAdmin(admin.ModelAdmin):
#     lists = []
#     for f in Food._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodAttribute)
# class FoodAttributeAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodAttribute._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodAttributeType)
# class FoodAttributeTypeAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodAttributeType._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodCalorieConversionFactor)
# class FoodCalorieConversionFactorAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodCalorieConversionFactor._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodComponent)
# class FoodComponentAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodComponent._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodNutrient)
# class FoodNutrientAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodNutrient._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodNutrientConversionFactor)
# class FoodNutrientConversionFactorAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodNutrientConversionFactor._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodPortion)
# class FoodPortionAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodPortion._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodProteinConversionFactor)
# class FoodProteinConversionFactorAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodProteinConversionFactor._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoodUpdateLogEntry)
# class FoodUpdateLogEntryAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoodUpdateLogEntry._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(FoundationFood)
# class FoundationFoodAdmin(admin.ModelAdmin):
#     lists = []
#     for f in FoundationFood._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(InputFood)
# class InputFoodAdmin(admin.ModelAdmin):
#     lists = []
#     for f in InputFood._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(LabMethod)
# class LabMethodAdmin(admin.ModelAdmin):
#     lists = []
#     for f in LabMethod._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(LabMethodCode)
# class LabMethodCodeAdmin(admin.ModelAdmin):
#     lists = []
#     for f in LabMethodCode._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(LabMethodNutrient)
# class LabMethodNutrientAdmin(admin.ModelAdmin):
#     lists = []
#     for f in LabMethodNutrient._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(MarketAcquisition)
# class MarketAcquisitionAdmin(admin.ModelAdmin):
#     lists = []
#     for f in MarketAcquisition._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(MeasureUnit)
# class MeasureUnitAdmin(admin.ModelAdmin):
#     lists = []
#     for f in MeasureUnit._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(Nutrient)
# class NutrientAdmin(admin.ModelAdmin):
#     lists = []
#     for f in Nutrient._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(SampleFood)
# class SampleFoodAdmin(admin.ModelAdmin):
#     lists = []
#     for f in SampleFood._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# # @admin.register(SQLiteMaster)
# # class SQLiteMasterAdmin(admin.ModelAdmin):
# #     lists = []
# #     for f in SQLiteMaster._meta.fields:
# #         lists.append(f.name)
# #     list_display = lists
# #     pass
# #
#
# @admin.register(SubSampleFood)
# class SubSampleFoodAdmin(admin.ModelAdmin):
#     lists = []
#     for f in SubSampleFood._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
#
#
# @admin.register(SubSampleResult)
# class SubSampleResultAdmin(admin.ModelAdmin):
#     lists = []
#     for f in SubSampleResult._meta.fields:
#         lists.append(f.name)
#     list_display = lists
#     pass
