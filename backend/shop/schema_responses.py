import graphene

from shop.schema_types import ItemType


class MutateItemFailed(graphene.ObjectType):
    error_message = graphene.String()


class MutateItemSuccess(graphene.ObjectType):
    item = graphene.Field(ItemType, required=True)


class MutateItemResponse(graphene.Union):
    class Meta:
        types = (MutateItemFailed, MutateItemSuccess)
