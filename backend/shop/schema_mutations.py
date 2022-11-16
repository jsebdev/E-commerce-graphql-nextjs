import os

from django.conf import settings
from django.core.files import File
from django.core.files.storage import default_storage

import graphene
from graphql_auth import mutations
from graphene_file_upload.scalars import Upload

from pathlib import Path

from shop.schema_responses import MutateItemFailed, MutateItemResponse, MutateItemSuccess, DeleteItemSuccess
from . import models
from .constants import IMAGES_PATH
from .helpers import get_image_format, fix_spaces, replace_format


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

        seller = graphene.String(required=True)
        tags = graphene.List(graphene.ID)
        newTags = graphene.List(graphene.String)

    Output = MutateItemResponse

    @classmethod
    def mutate(cls, root, info, image=None, **kwargs):
        if (image):
            kwargs['image'] = image

        # Obtain the item's seller. It must exists already
        try:
            seller = models.Profile.objects.get(username=kwargs.pop('seller'))
        except models.Profile.DoesNotExist:
            return MutateItemFailed(error_message='Seller does not exist')

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
            return MutateItemFailed(error_message=str(e))

        if newTags:
            for t in newTags:
                tag = t.lower()
                possible_existing_tag = models.Tag.objects.filter(name=tag)
                if possible_existing_tag.exists():
                    item.tags.add(possible_existing_tag.first())
                else:
                    item.tags.create(name=tag)

        return MutateItemSuccess(item=item)


class ItemModification(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        title = graphene.String(required=False)
        subtitle = graphene.String()
        description = graphene.String()
        published = graphene.Boolean()
        price = graphene.Decimal()
        image = Upload(required=False, description="Item's image")

        tags = graphene.List(graphene.ID)
        newTags = graphene.List(graphene.String)

    Output = MutateItemResponse

    @classmethod
    def mutate(cls, root, info, image=None, **kwargs):
        # Obtain the item's tags. They must exist already
        tagsIds = kwargs.pop('tags', None)
        if tagsIds:
            tags = models.Tag.objects.filter(id__in=tagsIds)

        # Get new tags names before item creation
        newTags = kwargs.pop('newTags', None)

        try:
            item = models.Item.objects.get(id=kwargs.pop('id'))
        except Exception as e:
            return MutateItemFailed(error_message=str(e))

        new_title = kwargs.pop('title', None)
        if new_title and new_title != item.title:
            item.title = new_title
            if item.image:
                initial_path = item.image.path
                fixed_title = fix_spaces(new_title)
                new_filename = f'{fixed_title}.{get_image_format(initial_path)}'
                new_name = f'{IMAGES_PATH}{fixed_title}/{new_filename}'
                new_path = f'{settings.MEDIA_ROOT}/{new_name}'
                new_directory = f'{settings.MEDIA_ROOT}/{IMAGES_PATH}{fixed_title}'
                old_directory = Path(initial_path).parent
                os.mkdir(new_directory)
                os.replace(initial_path, new_path)
                os.rmdir(old_directory)
                item.image.name = new_name

        item.subtitle = kwargs.pop('subtitle', item.subtitle)
        item.description = kwargs.pop('description', item.description)
        item.published = kwargs.pop('published', item.published)
        item.price = kwargs.pop('price', item.price)

        # Remove all tags
        if tagsIds or newTags:
            item.tags.clear()
        item.tags.clear()
        # Add new tags
        if tagsIds:
            item.tags.set(tags)
        # Create tags that didn't exist
        if newTags:
            for t in newTags:
                tag = t.lower()
                possible_existing_tag = models.Tag.objects.filter(name=tag)
                if possible_existing_tag.exists():
                    item.tags.add(possible_existing_tag.first())
                else:
                    item.tags.create(name=tag)

        if (image):
            file = File(image)
            if item.image:
                # print('therre is an image already')
                # print(item.image.path)
                # print(image)
                # print(type(image))
                # print('157: file.name >>>', file.name)
                format = get_image_format(file.name)
                # print('163: format >>>', format)
                # print(type(file))
                try:
                    os.remove(item.image.path)
                except Exception as e:
                    print(e)
                path = default_storage.save(
                    replace_format(item.image.path, format), file)
                item.image.name = replace_format(item.image.name, format)
            else:
                fixed_title = fix_spaces(item.title)
                new_filename = f'{fixed_title}.{get_image_format(file.name)}'
                new_name = f'{IMAGES_PATH}{fixed_title}/{new_filename}'
                new_path = f'{settings.MEDIA_ROOT}/{new_name}'
                path = default_storage.save(new_path, file)
                item.image.name = new_name
            print('new image saved in ', path)
        else:
            print('no image was sent')

        item.save()

        return MutateItemSuccess(item=item)


class ItemDeletion(graphene.Mutation):
    class Arguments:
        id = graphene.ID()

    Output = MutateItemResponse

    @classmethod
    def mutate(cls, root, info, id):
        # get the item
        try:
            item = models.Item.objects.get(id=id)
        except Exception as e:
            return MutateItemFailed(error_message=str(e))
        if item.image:
            try:
                os.remove(item.image.path)
                os.rmdir(Path(item.image.path).parent)
            except Exception as e:
                print(e)
        item.delete()

        return DeleteItemSuccess(success=True)


class Mutation(AuthMutation, graphene.ObjectType):
    create_item = ItemCreation.Field()
    modify_item = ItemModification.Field()
    delete_item = ItemDeletion.Field()
