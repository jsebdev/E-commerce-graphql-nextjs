import graphene
from graphql_auth import mutations
from graphene_file_upload.scalars import Upload

from shop.schema_responses import CreateItemFailed, CreateItemResponse, CreateItemSuccess
from . import models


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    verify_account = mutations.VerifyAccount.Field()
    token_auth = mutations.ObtainJSONWebToken.Field()
    update_account = mutations.UpdateAccount.Field()
    resend_activation_email = mutations.ResendActivationEmail.Field()
    send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    password_reset = mutations.PasswordReset.Field()


class ItemCreation(graphene.Mutation):
    class Arguments:
        title = graphene.String(required=True)
        subtitle = graphene.String()
        description = graphene.String()
        published = graphene.Boolean()
        price = graphene.Decimal()
        image = Upload(required=False, description="Item's image")

        seller = graphene.ID(required=True)
        tags = graphene.List(graphene.ID)
        newTags = graphene.List(graphene.String)

    Output = CreateItemResponse

    @classmethod
    def mutate(cls, root, info, image=None, **kwargs):
        print('printing the image:')
        print(image)
        print('image printed')
        # Obtain the item's seller. It must exists already
        try:
            seller = models.Profile.objects.get(username=kwargs.pop('seller'))
        except models.Profile.DoesNotExist:
            return CreateItemFailed(error_message='Seller does not exist')

        # Obtain the item's tags. They must exist already
        tagsIds = kwargs.pop('tags', None)
        if tagsIds:
            tags = models.Tag.objects.filter(id__in=tagsIds)

        # Get new tags names before item creation
        newTags = kwargs.pop('newTags', None)

        try:
            item = seller.item_set.create(**kwargs)
            if tagsIds:
                item.tags.set(tags)
        except Exception as e:
            return CreateItemFailed(error_message=str(e))

        if newTags:
            for t in newTags:
                tag = t.lower()
                possible_existing_tag = models.Tag.objects.filter(name=tag)
                if possible_existing_tag.exists():
                    item.tags.add(possible_existing_tag.first())
                else:
                    item.tags.create(name=tag)

        return CreateItemSuccess(item=item)


class Mutation(AuthMutation, graphene.ObjectType):
    create_item = ItemCreation.Field()
