from django.contrib import admin
from simple_history.admin import SimpleHistoryAdmin
from .models import Asset, SnP500Price

@admin.register(Asset)
class AssetAdmin(SimpleHistoryAdmin):
    list_display = ('id', 'ticker', 'shares', 'costbasis', 'buyDate', 'user')
    history_list_display = ('id', 'ticker', 'shares', 'costbasis', 'buyDate','user')

@admin.register(SnP500Price)
class SnP500PriceAdmin(SimpleHistoryAdmin):
    list_display = ('id', 'date', 'price')
    history_list_display = ('id', 'date', 'price')