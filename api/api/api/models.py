from django.db import models
from ckeditor.fields import RichTextField
# Create your models here.

from django.utils.text import slugify

class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True, null=True)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class SubCategory(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, null=True, blank=True)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to="uploads/SubCategory")
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Packages(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, null=True, blank=True)
    slug = models.SlugField(max_length=150, unique=True, blank=True, null=True)
    image = models.ImageField(null=True, blank=True, upload_to="uploads/Packages")
    description = models.TextField(null=True, blank=True)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    
    
class SubPackages(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    packages = models.ForeignKey(Packages, on_delete=models.CASCADE)
    name = models.CharField(max_length=150, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to="uploads/Packages")
    location = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    accomodation = models.CharField(max_length=250)
    food = models.CharField(max_length=250)
    days = models.CharField(max_length=50)
    transport = models.CharField(max_length=150)
    price = models.CharField(max_length=250)
    trending = models.BooleanField(default=False)
    status = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    slug = models.SlugField(unique=True, blank=True, null=True)     
    
    def save(self, *args, **kwargs):
        if not self.slug and self.name:
            self.slug = slugify(self.name)
        super(SubPackages, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.name
        
class CityCoordinates(models.Model):
    subpackage = models.ForeignKey(SubPackages, related_name='citycoordinates_set', on_delete=models.CASCADE)
    city_name = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    
class LatestTours(models.Model):
    name=models.CharField( max_length=200)
    image = models.ImageField(null=True,blank=True,upload_to="uploads/LatestTours")
    status=models.BooleanField(default=False)
    
class TripHighlights(models.Model):
    subpackages = models.ForeignKey(SubPackages, on_delete=models.CASCADE)
    name=models.CharField( max_length=200)
    image = models.ImageField(null=True,blank=True,upload_to="uploads/TripHighlights")
    description=models.TextField(null=True, blank=True)
    
class DaySchedules(models.Model):
    subpackages = models.ForeignKey(SubPackages, on_delete=models.CASCADE,related_name='dayschedule_set')
    day = models.CharField(max_length=250,null=True, blank=True)
    image = models.ImageField(upload_to='uploads/images/',null=True, blank=True)
    city_name = models.CharField(max_length=250,null=True, blank=True)
    description = RichTextField(null=True, blank=True)

    def __str__(self):
        return f"Day {self.day}: {self.city_name}"





class Request(models.Model):
    first_name = models.CharField(max_length=250)
    last_name = models.CharField(max_length=250)
    mobile = models.CharField(max_length=250)
    email = models.EmailField()
    date = models.DateField(auto_now_add=False)
    by_email = models.BooleanField(default=False)
    by_phone = models.BooleanField(default=False)
    update_latest_news = models.BooleanField(default=False)
    past_traveller = models.BooleanField(default=False)
    
    def __str__(self):
        return self.first_name