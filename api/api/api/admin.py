from django.contrib import admin
from api.models import *
from atexit import register
# Register your models here.

class TripHighlightsInline(admin.TabularInline):
    model = TripHighlights
    
class DaySchedulesInline(admin.TabularInline):
    model = DaySchedules
    
class CityCoordinatesInline(admin.TabularInline):
    model = CityCoordinates


@admin.register(Category)
class CatagoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'status']
    search_fields = ['name']

@admin.register(SubCategory)
class SubCategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'category','status']
    search_fields = ['name']
    list_filter = ['category']

@admin.register(Packages)
class PackagesAdmin(admin.ModelAdmin):
    list_display = ['name', 'category','subcategory','status']
    search_fields = ['name']
    list_filter = ['category','subcategory']

@admin.register(SubPackages)
class SubPackagesAdmin(admin.ModelAdmin):
    inlines = [TripHighlightsInline,DaySchedulesInline,CityCoordinatesInline]
    list_display = ['name', 'category', 'subcategory', 'packages','status']
    list_filter = ['category', 'subcategory', 'packages', 'status']
    search_fields = ['name']


admin.site.register(LatestTours)
