import graphene

from shop.schema_types import ItemType


class CreateItemFailed(graphene.ObjectType):
    error_message = graphene.String()


class CreateItemSuccess(graphene.ObjectType):
    item = graphene.Field(ItemType, required=True)


class CreateItemResponse(graphene.Union):
    class Meta:
        types = (CreateItemFailed, CreateItemSuccess)
