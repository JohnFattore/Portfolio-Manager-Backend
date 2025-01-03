from django.urls import path
from . import views

urlpatterns = [
    path('api/assets/', views.AssetListCreateView.as_view(), name="assets"),
    path('api/asset/<int:pk>/', views.AssetRetrieveDestroyView.as_view(), name="asset"),
    path('api/update-snp500-price/', views.UpdateSnP500PriceView.as_view(), name='update-snp500-price'),
]