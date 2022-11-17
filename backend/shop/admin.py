from django.apps import apps
from django.contrib import admin

from .models import Item, Profile, Tag


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ('id', 'username', 'bio')


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    model = Item
    list_display = ('id', 'title', 'price', 'published',
                    'seller', 'description')
    list_filter = ('published', 'price', 'seller', 'tags')
    list_editable = ('title', 'published', 'description', 'price')
    search_fields = ('title', 'description', 'subtitle')
    date_hierarchy = 'date_created'
    save_on_top: bool = True


app = apps.get_app_config("graphql_auth")
for model_name, model in app.models.items():
    admin.site.register(model)
