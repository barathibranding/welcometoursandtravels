from rest_framework import generics
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.exceptions import ValidationError



from api.models import *
from api.serializers import *

class SearchView(generics.ListAPIView):
    queryset = SubPackages.objects.all()
    serializer_class = SubPackagesSerializers
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'description','location','price']
    
    
    
class CategoryListApiView(generics.ListAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializers
    
class GetCategoryApiView(generics.RetrieveAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializers
    
class SubCategoryListApiView(generics.ListAPIView):
    queryset=SubCategory.objects.all()
    serializer_class=SubCategorySerializers
    
class PackagesListApiView(generics.ListAPIView):
    queryset=Packages.objects.all()
    serializer_class=PackagesSerializers
    
class PackagessGetApiView(generics.ListAPIView):
    serializer_class = PackagesSerializers

    def get_queryset(self):
        category_id = self.kwargs.get('category_id')
        if not category_id:
            raise ValidationError("category_id parameter is required")
        
        queryset = Packages.objects.filter(category_id=category_id)
        return queryset
    
class SubPackageListApiView(generics.ListAPIView):
    queryset=SubPackages.objects.all()
    serializer_class=SubPackagesSerializer



class SubPackagesListApiView(generics.ListAPIView):
    # queryset=SubPackages.objects.all()
    
    serializer_class=SubPackagesSerializers
    
    def get_queryset(self):
        packages_id = self.kwargs['packages_id']  
        queryset = SubPackages.objects.filter(packages_id=packages_id)
        return queryset



class SubPackagesGetApiView(generics.RetrieveAPIView):
    serializer_class = SubPackagesSerializers

    def get_queryset(self):
        return SubPackages.objects.prefetch_related('triphighlights_set', 'dayschedule_set', 'packages','citycoordinates_set')

    def get_object(self):
        id = self.kwargs['id']
        queryset = self.get_queryset()
        obj = get_object_or_404(queryset, id=id)
        return obj



class TrendingPackagesApiView(generics.ListAPIView):
    serializer_class = PackagesSerializers

    def get_queryset(self):
        queryset = Packages.objects.filter(trending=True)
        return queryset
        
        
        
class PackagesGetApiView(generics.ListAPIView):
    serializer_class = PackagesSerializers

    def get_queryset(self):
        subcategory_id = self.kwargs['subcategory_id']  # assuming you're passing subcategory_id in URL
        queryset = Packages.objects.filter(subcategory_id=subcategory_id)
        return queryset
        
class LatestToursListApiView(generics.ListAPIView):
    queryset=LatestTours.objects.all()
    serializer_class=LatestToursSerializers
    
    
class RequestCreateView(generics.CreateAPIView):
    queryset = Request.objects.all()
    serializer_class = RequestSerializer



# class RequestCreateView(generics.CreateAPIView):
#     serializer_class = RequestSerializer

#     def post(self, request, *args, **kwargs):
#         serializer = self.get_serializer(data=request.data)
#         if serializer.is_valid():
#             self.perform_create(serializer)
#             self.send_email(serializer.validated_data)
#             return Response({"message": "Thank you! Our team member will contact you soon."}, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     def send_email(self, data):
#         first_name = data['first_name']
#         last_name = data['last_name']
#         email = data['email']
#         date = data['date']
#         mobile = data['mobile']
#         by_email = data['by_email']
#         by_phone = data['by_phone']
#         update_latest_news = data['update_latest_news']
#         past_traveller = data['past_traveller']
#         subject = 'New RequestForm Submission in Welcome Tours And Travel'
#         email_message = f'You have received a new contact form submission:\nFirst Name: {first_name}\nLast Name: {last_name}\nEmail: {email}\nDate: {date}\nMobile: {mobile}'
#         from_email = settings.DEFAULT_FROM_EMAIL
#         to_email = 'support@brandingworld.net'  # Change this to the owner's email address
#         send_mail(subject, email_message, from_email, [to_email]) 