from django.shortcuts import render
from django.contrib.auth.models import User

from rest_framework import generics
from rest_framework import authentication 

from .models import Cart, CartItem
from .serializers import CartSerializer, OrderSerializer, CreateAccountSerializer
from .authentication import TokenAuthentication
from  .mixins import  StaffPermissionMixin, QuerySetMixin


# Create your views here.
# Main Products
class CartList(
    generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    
        
    
class CartCreate(
    StaffPermissionMixin,
    generics.ListCreateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
 
    
class CartRetrieve(generics.RetrieveAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = 'pk'


class CartUpdate(
    StaffPermissionMixin,
    generics.UpdateAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = 'pk'
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    
class CartDestroy(
    StaffPermissionMixin,
    generics.DestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    lookup_field = 'pk'
    authentication_classes = [authentication.SessionAuthentication, TokenAuthentication]
    
    

# Ordering

class OrderListCreate(
    QuerySetMixin,
    generics.ListCreateAPIView):
    queryset = CartItem.objects.all()
    serializer_class =  OrderSerializer
    
    
    def perform_create(self, serializer):
        request = self.request
        serializer.save(user=request.user)
    
    
class OrderRetrieve(
    QuerySetMixin,
    generics.RetrieveAPIView):
    queryset = CartItem.objects.all()
    serializer_class =  OrderSerializer
    lookup_field = 'pk'
    
class OrderUpdate(
    QuerySetMixin,
    generics.UpdateAPIView):  
    queryset = CartItem.objects.all()
    serializer_class =  OrderSerializer
    lookup_field = 'pk'
    
    
class OrderDestroy(
    QuerySetMixin,
    generics.DestroyAPIView):
    queryset = CartItem.objects.all()
    serializer_class =  OrderSerializer
    lookup_field = 'pk'


# Create User

class UserCreate(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = CreateAccountSerializer
