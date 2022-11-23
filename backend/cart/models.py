from django.db import models
from django.conf  import settings
# Create your models here.

User = settings.AUTH_USER_MODEL

class Cart(models.Model):
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    product_name = models.CharField(max_length=200)
    product_image = models.ImageField(upload_to='images/', null=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(decimal_places=2, max_digits=500, default=99.99)
    date_created = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.product_name
    
     
class CartItem(models.Model):
    user = models.ForeignKey(User, default=1, on_delete=models.CASCADE)
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    date_ordered = models.DateTimeField(auto_now_add=True)
    
    

    def my_amount(self):
        return self.cart.price * self.quantity
    
    def my_item(self):
        return self.cart.product_name
    

    def __str__(self):
         return f'{str(self.user)} | {self.cart}' 