from django.urls import path 

from . import views

urlpatterns = [
    path('', views.CartList.as_view(), name='cart-list'),
    path('create/', views.CartCreate.as_view(), name='cart-create'),
    path('detail/<int:pk>/', views.CartRetrieve.as_view(), name='cart-detail'),
    path('update/<int:pk>/', views.CartUpdate.as_view(), name='cart-update'),
    path('delete/<int:pk>/', views.CartDestroy.as_view(), name='cart-delete'),
    
    path('orders/', views.OrderListCreate.as_view()),
    path('detail-order/<int:pk>/', views.OrderRetrieve.as_view(), name='order-detail'),
    path('edit-order/<int:pk>/', views.OrderUpdate.as_view(), name='order-edit'),
    path('delete-order/<int:pk>/', views.OrderDestroy.as_view(), name='order-delete'),
    
    path('create-account/', views.UserCreate.as_view()),
    
]
