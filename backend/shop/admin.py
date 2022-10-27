from django.contrib import admin

from .models import Item, Profile, Tag


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    model = Profile
    list_display = ('id', 'user', 'bio')


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    model = Tag


@admin.register(Item)
class ItemAdmin(admin.ModelAdmin):
    model = Item
    list_display = ('id', 'title', 'subtitle', 'published')
    list_filter = ('published',)
    list_editable = ('title', 'subtitle', 'published')
    search_fields = ('title', 'description', 'subtitle')
    date_hierarchy = 'date_created'
    save_on_top: bool = True
