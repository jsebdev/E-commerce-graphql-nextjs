from django.db import models
from django.conf import settings
from django.utils import timezone


class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL, on_delete=models.PROTECT)
    bio = models.CharField(blank=True, max_length=500)

    def __str__(self):
        return f'user {self.user.get_username()}'


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name


class Item(models.Model):
    class Meta:
        ordering = ['-publish_date']

    title = models.CharField(max_length=100, unique=True)
    subtitle = models.CharField(max_length=100)
    slug = models.SlugField(max_length=255, unique=True)
    description = models.TextField()
    meta_description = models.CharField(max_length=100, blank=True)
    date_created = models.DateTimeField()
    date_modified = models.DateTimeField()
    publish_date = models.DateTimeField(blank=True, null=True)
    published = models.BooleanField(default=False)

    seller = models.ForeignKey(Profile, on_delete=models.PROTECT)
    tags = models.ManyToManyField(Tag, related_name='items')

    def save(self, *args, **kwargs):
        '''On save, update timestamps'''
        if not self.id:
            self.date_created = timezone.now()
        self.date_modified = timezone.now()
        return super(Item, self).save(*args, **kwargs)
