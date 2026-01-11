from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify
from django.utils import timezone
from django.urls import reverse
from django.core.validators import MinValueValidator, MaxValueValidator
from django.conf import settings
import uuid
from django_ckeditor_5.fields import CKEditor5Field

User = get_user_model()

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)
    is_published = models.BooleanField(default=False)

    class Meta:
        abstract = True

class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)
    order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    meta_title = models.CharField(max_length=100, blank=True, default='')
    meta_description = models.TextField(blank=True, default='')

    class Meta:
        verbose_name_plural = "Categories"
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Tag(models.Model):
    name = models.CharField(max_length=50)
    slug = models.SlugField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

class Client(models.Model):
    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to='clients/logos/', null=True, blank=True)
    description = models.TextField(blank=True)
    website = models.URLField(blank=True)
    industry = models.CharField(max_length=100, blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class BlogPost(TimeStampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    content = CKEditor5Field('Content', config_name='extends')
    excerpt = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='blog/covers/', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    categories = models.ManyToManyField(Category, related_name='blog_posts')
    tags = models.ManyToManyField(Tag, related_name='blog_posts')
    read_time = models.IntegerField(validators=[MinValueValidator(1)], help_text='Estimated reading time in minutes', default=1)
    views = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)
    allow_comments = models.BooleanField(default=True)
    meta_title = models.CharField(max_length=100, blank=True, default='')
    meta_description = models.TextField(blank=True, default='')
    schema_markup = models.JSONField(blank=True, null=True)
    version = models.PositiveIntegerField(default=1)
    status = models.CharField(
        max_length=20,
        choices=[
            ('draft', 'Draft'),
            ('review', 'In Review'),
            ('published', 'Published'),
            ('archived', 'Archived')
        ],
        default='draft'
    )

    class Meta:
        ordering = ['-published_at', '-created_at']
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['status']),
            models.Index(fields=['published_at']),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.excerpt:
            self.excerpt = self.content[:200] + '...'
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def increment_views(self):
        self.views += 1
        self.save(update_fields=['views'])

    def get_absolute_url(self):
        return reverse('blog-post-detail', kwargs={'slug': self.slug})

class CaseStudy(TimeStampedModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    content = CKEditor5Field('Content', config_name='extends')
    excerpt = models.TextField(blank=True)
    cover_image = models.ImageField(upload_to='case-studies/covers/', null=True, blank=True)
    client = models.ForeignKey(Client, on_delete=models.CASCADE, related_name='case_studies')
    industry = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='case_studies_industry')
    categories = models.ManyToManyField(Category, related_name='case_studies_categories')
    tags = models.ManyToManyField(Tag, related_name='case_studies')
    key_results = models.JSONField(blank=True, null=True)
    technologies = models.JSONField(blank=True, null=True)
    testimonial = models.TextField(blank=True)
    read_time = models.IntegerField(validators=[MinValueValidator(1)], help_text='Estimated reading time in minutes', default=1)
    views = models.PositiveIntegerField(default=0)
    featured = models.BooleanField(default=False)
    allow_comments = models.BooleanField(default=True)
    meta_title = models.CharField(max_length=100, blank=True, default='')
    meta_description = models.TextField(blank=True, default='')
    schema_markup = models.JSONField(blank=True, null=True)
    version = models.PositiveIntegerField(default=1)
    status = models.CharField(
        max_length=20,
        choices=[
            ('draft', 'Draft'),
            ('review', 'In Review'),
            ('published', 'Published'),
            ('archived', 'Archived')
        ],
        default='draft'
    )

    class Meta:
        ordering = ['-published_at', '-created_at']
        verbose_name_plural = "Case Studies"
        indexes = [
            models.Index(fields=['slug']),
            models.Index(fields=['status']),
            models.Index(fields=['published_at']),
        ]

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        if not self.excerpt:
            self.excerpt = self.content[:200] + '...'
        if self.is_published and not self.published_at:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)

    def increment_views(self):
        self.views += 1
        self.save(update_fields=['views'])

    def get_absolute_url(self):
        return reverse('case-study-detail', kwargs={'slug': self.slug})

class Comment(models.Model):
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    blog_post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    case_study = models.ForeignKey(CaseStudy, on_delete=models.CASCADE, related_name='comments', null=True, blank=True)
    parent_comment = models.ForeignKey('self', on_delete=models.CASCADE, related_name='replies', null=True, blank=True)
    is_approved = models.BooleanField(default=False)
    is_spam = models.BooleanField(default=False)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'Comment by {self.author.username} on {self.created_at}'