from rest_framework import serializers
from api.models import *

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'
        
class SubCategorySerializers(serializers.ModelSerializer):
    class Meta:
        model=SubCategory
        fields='__all__'
       

class PackagesSerializers(serializers.ModelSerializer):
    class Meta:
        model=Packages
        fields='__all__'

class SubPackagesSerializer(serializers.ModelSerializer):
    class Meta:
        model=SubPackages
        fields='__all__'

class TripHighlightsSerializers(serializers.ModelSerializer):
    class Meta:
        model = TripHighlights
        fields = ['id', 'name','image', 'description']
        
class DaySchedulesSerializers(serializers.ModelSerializer):
    class Meta:
        model = DaySchedules
        fields = ['id', 'city_name','day', 'image', 'description']
        
class CityCoordinatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CityCoordinates
        fields = '__all__'

        

class SubPackagesSerializers(serializers.ModelSerializer):
    triphighlights_set = TripHighlightsSerializers(many=True)
    dayschedule_set = DaySchedulesSerializers(many=True)
    citycoordinates_set = CityCoordinatesSerializer(many=True)
    packages = PackagesSerializers() 
    class Meta:
        model = SubPackages
        fields = '__all__'
        
        
        
class LatestToursSerializers(serializers.ModelSerializer):
    class Meta:
        model=LatestTours
        fields='__all__'
        
class RequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Request
        fields = ['id', 'first_name','last_name', 'email','date','mobile','by_email','by_phone','update_latest_news','past_traveller']
        
