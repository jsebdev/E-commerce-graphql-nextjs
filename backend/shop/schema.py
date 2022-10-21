from django.contrib.auth import get_user_model
from graphene_django import DjangoObjectType
import graphene

from . import models


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class SellerType(DjangoObjectType):
    class Meta:
        model = models.Profile


class ItemType(DjangoObjectType):
    class Meta:
        model = models.Item


class TagType(DjangoObjectType):
    class Meta:
        model = models.Tag


class Query(graphene.ObjectType):
    items = graphene.List(ItemType)
    user_by_username = graphene.Field(UserType, username=graphene.String())
    item_by_slug = graphene.Field(ItemType, slug=graphene.String())
    item_by_author = graphene.List(ItemType, username=graphene.String())
    item_by_tag = graphene.List(ItemType, tag=graphene.String())

    def resolve_items(root, info):
        return models.Item.objects.prefetch_related().select_related('seller').all()

    def resolve_user_by_username(root, info, username):
        return models.Profile.objects.select_related('user').get(user__username=username)

    def resolve_item_by_slug(root, info, slug):
        return models.Item.objects.prefetch_related('tags').select_related('user').get(slug=slug)

    def resolve_item_by_tag(root, info, tag):
        return models.Item.objects.prefetch_related('tags').select_related('user').filter(tags__name__iexact=tag)


schema = graphene.Schema(query=Query)
