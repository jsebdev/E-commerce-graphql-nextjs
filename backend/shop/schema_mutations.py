
import graphene

from shop.schema_responses import CreateItemFailed, CreateItemResponse, CreateItemSuccess

from . import models
from .schema_types import ItemType, TagType, UserType, SellerType


class ItemCreation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        subtitle = graphene.String()
        description = graphene.String()
        date_created = graphene.DateTime()
        date_modified = graphene.DateTime()
        publish_date = graphene.DateTime()
        published = graphene.Boolean()

        seller = graphene.ID(required=True)
        tags = graphene.List(graphene.ID)

    Output = CreateItemResponse

    @classmethod
    def mutate(cls, root, info, **kwargs):
        try:
            seller = models.Profile.objects.get(id=kwargs.pop('seller'))
        except models.Profile.DoesNotExist:
            return CreateItemFailed(error_message='Seller does not exist')
        try:
            item = seller.item_set.create(**kwargs)
        except Exception as e:
            return CreateItemFailed(error_message=str(e))
        return CreateItemSuccess(item=item)
