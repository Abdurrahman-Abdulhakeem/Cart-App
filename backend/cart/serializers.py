from rest_framework import serializers
from rest_framework.reverse import reverse

from django.contrib.auth.models import User

from .models import Cart, CartItem


class CreateAccountSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        fields = [
            'first_name',
            'username',
            'password',
        ]
        
    def create(self, validated_data):
        obj = super().create(validated_data)
        obj.set_password(validated_data.get('password'))
        obj.save()
        return obj
    
    
    def validate(self, query):
        if len(query['password']) < 6:
            raise serializers.ValidationError({"Password": "Password too short!."})
        return query
    
    # def create(self, validated_data):
    #     password = validated_data.get('password')
    #     confirm_password = validated_data.get('confirm_password')
    #     confirm_password = password
    #     if confirm_password != password:
    #         raise serializers.ValidationError({"Password": "Password fields didn't match!."})
    #     return super().create(validated_data)


class UserSerializer(serializers.Serializer):
    username = serializers.CharField(read_only=True)
    
    

class CartSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField(read_only=True)
    owner = UserSerializer(source='user', read_only=True)
    
    class Meta:
        model = Cart
        fields = [
            'owner',
            'url',
            'product_name',
            'product_image',
            'description',
            'price',
            'date_created',
        ]
        
    def get_url(self, obj):
        request = self.context.get('request')
        return reverse('cart-detail', kwargs={'pk': obj.pk}, request=request)
    
    
    
    
class OrderSerializer(serializers.ModelSerializer):
    amount = serializers.SerializerMethodField(read_only=True)
    product = serializers.SerializerMethodField()
    owner = UserSerializer(source='user', read_only=True)
    url = serializers.HyperlinkedIdentityField(
        view_name='order-detail',
        lookup_field='pk')
    
    class Meta:
        model = CartItem
        fields = [
            'owner',
            'url',
            'product',
            'cart',
            'quantity',
            'amount',
            'date_ordered'
        ]

    def get_product(self, obj):
        if not hasattr(obj, 'id'):
            return None
        if not  isinstance(obj, CartItem):
            return None
        return obj.my_item()
    
    
    def get_amount(self, obj):
        if not hasattr(obj, 'id'):
            return None
        if not  isinstance(obj, CartItem):
            return None
        return obj.my_amount()