import graphene
from django.db.models import Q
from graphql_auth.schema import UserQuery, MeQuery
from .schema_types import ItemType, SellerType, TagType, UserType
from . import models


class Query(UserQuery, MeQuery, graphene.ObjectType):
    items = graphene.List(ItemType, filter=graphene.Boolean(),
                          published=graphene.Boolean())
    user_by_username = graphene.Field(SellerType, username=graphene.String())
    items_by_seller = graphene.List(ItemType, username=graphene.String())
    items_by_tags = graphene.List(
        ItemType, tagsIds=graphene.List(graphene.ID), filter=graphene.Boolean(), published=graphene.Boolean())
    items_by_search = graphene.List(ItemType, searchText=graphene.String())
    item_by_id = graphene.Field(ItemType, id=graphene.ID())
    tags = graphene.List(TagType, filter=graphene.Boolean(),
                         with_items=graphene.Boolean(), with_published=graphene.Boolean())

    def resolve_tags(root, info, filter=False, with_items=True, with_published=True):
        if filter is True and with_items is True and with_published is True:
            return models.Tag.objects.filter(items__published=True).distinct()
        if filter is True and with_items is True and with_published is False:
            return models.Tag.objects.filter(items__published=False).distinct()
        if filter is True and with_items is False:
            return models.Tag.objects.filter(items=None).distinct()
        return models.Tag.objects.all()

    def resolve_items(root, info, filter=False, published=False):
        items = models.Item.objects.prefetch_related().select_related('seller')
        if filter is True:
            return items.filter(published=published)
        return items.all()

    def resolve_items_by_seller(root, info, username):
        return models.Item.objects.prefetch_related('tags').select_related('seller').filter(seller__username=username)

    def resolve_items_by_tags(root, info, tagsIds, filter=True, published=True):
        if filter is True:
            return models.Item.objects.prefetch_related('tags').select_related('seller').filter(tags__id__in=tagsIds, published=published).distinct()
        return models.Item.objects.prefetch_related('tags').select_related('seller').filter(tags__id__in=tagsIds).distinct()

    def resolve_items_by_search(root, info, searchText, filter=True, published=True):
        objects = models.Item.objects.prefetch_related('tags').select_related('seller').filter(Q(title__icontains=searchText) |
                                                                                               Q(subtitle__icontains=searchText) |
                                                                                               Q(description__icontains=searchText) |
                                                                                               Q(tags__name__icontains=searchText) |
                                                                                               Q(seller__username__icontains=searchText)).distinct()
        if filter is True:
            return objects.filter(published=published)
        return objects

    def resolve_item_by_id(root, info, id):
        return models.Item.objects.prefetch_related('tags').select_related('seller').get(id=id)
