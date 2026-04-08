from django.urls import path
from .views.generics import (
    ProductListGeneric, 
    ProductDetailGeneric, 
    CategoryListGeneric, 
    CategoryDetailGeneric,
    CategoryProductsAPIView
)

urlpatterns = [
    path('products/', ProductListGeneric.as_view()),
    path('products/<int:id>/', ProductDetailGeneric.as_view()),
    path('categories/', CategoryListGeneric.as_view()),
    path('categories/<int:pk>/', CategoryDetailGeneric.as_view()),
    path('categories/<int:pk>/products/', CategoryProductsAPIView.as_view()),
]