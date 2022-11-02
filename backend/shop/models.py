from django.db import models
from django.conf import settings
from django.utils import timezone
from django.contrib.auth.models import AbstractUser


class Profile(AbstractUser):
    email = models.EmailField(
        max_length=255, unique=True, blank=False, verbose_name='email')
    USERNAME_FIELD: str = 'username'
    EMAIL_FIELD: str = 'email'
    bio = models.CharField(blank=True, max_length=500)


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Item(models.Model):
    class Meta:
        ordering = ['-date_created']

    title = models.CharField(max_length=100, unique=True)
    subtitle = models.CharField(max_length=100, default="")
    description = models.TextField(default="")
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    published = models.BooleanField(default=False)

    seller = models.ForeignKey(Profile, on_delete=models.PROTECT)
    tags = models.ManyToManyField(Tag, related_name='items')

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
