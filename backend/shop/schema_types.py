from graphene_django import DjangoObjectType
from django.contrib.auth import get_user_model

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
