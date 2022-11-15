from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import AbstractUser
from .constants import IMAGES_PATH
from .helpers import get_image_format, fix_spaces


class Profile(AbstractUser):
    email = models.EmailField(
        max_length=255, unique=True, blank=False, verbose_name='email')
    USERNAME_FIELD: str = 'username'
    EMAIL_FIELD: str = 'email'
    bio = models.CharField(blank=True, max_length=500)


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.id} - {self.name}'


def get_image_path(instance, filename):
    fixed_title = fix_spaces(instance.title)
    return f'{IMAGES_PATH}{fixed_title}/{fixed_title}.{get_image_format(filename)}'


class Item(models.Model):
    class Meta:
        ordering = ['-date_modified']

    title = models.CharField(max_length=100, unique=True)
    subtitle = models.CharField(max_length=100, default="", blank=True)
    description = models.TextField(default="", blank=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    published = models.BooleanField(default=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    image = models.ImageField(upload_to=get_image_path,
                              blank=True, default=None)

    seller = models.ForeignKey(
        Profile, on_delete=models.PROTECT, related_name='item_set')
    tags = models.ManyToManyField(Tag, related_name='items', blank=True)

    def __str__(self):
        return f'{self.id} {self.title}'

    def save(self, *args, **kwargs):
        '''On save, update timestamps'''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(Item, self).save(*args, **kwargs)

# class Image(models.Model):
#     name = models.CharField(max_length=50, default=None)
#     img = models.ImageField(upload_to='images/', default=None)
