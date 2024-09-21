
from django.urls import path
from api.views import *

urlpatterns = [
    path('category-list/',CategoryListApiView.as_view()),
    path('subcategory-list/',SubCategoryListApiView.as_view()),
    path('package-list/',PackagesListApiView.as_view()),
    path('trending-packages/',TrendingPackagesApiView.as_view()),

    path('packages/<int:subcategory_id>/<slug:slug>',PackagesGetApiView.as_view()),
    path('packages-nav/<int:category_id>/<slug:slug>',PackagessGetApiView.as_view()),
    
    
    
    path('subpackages-list/',SubPackageListApiView.as_view()),
    path('sub-packages/<int:packages_id>/<slug:slug>',SubPackagesListApiView.as_view()),
    path('sub-package/detail/<int:id>/<slug:slug>',SubPackagesGetApiView.as_view()),
   
    
    
    
    path('latest-tours/',LatestToursListApiView.as_view()),
    
    path('search',SearchView.as_view()),
    path('request/',RequestCreateView.as_view()),
    
]
