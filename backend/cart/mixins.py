from cart.permissions import  IsStaffEditorPermission
from rest_framework import permissions

class StaffPermissionMixin:
    permission_classes = [permissions.IsAdminUser, IsStaffEditorPermission]
    
    

class QuerySetMixin:
    user_field = 'user'
    def get_queryset(self, *args, **kwargs):
        lookup_data = {}
        lookup_data[self.user_field] = self.request.user
        qs = super().get_queryset(*args, **kwargs)
        if not self.request.user.is_authenticated:
            return None
        return qs.filter(**lookup_data)