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
    item_by_tags = graphene.List(
        ItemType, tagsIds=graphene.List(graphene.ID))
    items_by_search = graphene.List(ItemType, searchText=graphene.String())
    item_by_id = graphene.Field(ItemType, id=graphene.ID())
    tags = graphene.List(TagType)

    def resolve_tags(root, info):
        return models.Tag.objects.all()

    def resolve_items(root, info, filter=False, published=False):
        items = models.Item.objects.prefetch_related().select_related('seller')
        if filter is True:
            return items.filter(published=published)
        return items.all()

    def resolve_items_by_seller(root, info, username):
        return models.Item.objects.prefetch_related('tags').select_related('seller').filter(seller__username=username)

    def resolve_item_by_tags(root, info, tagsIds):
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
