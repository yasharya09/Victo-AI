from django.contrib import admin
from django import forms
from django_ckeditor_5.widgets import CKEditor5Widget
from .models import BlogPost, CaseStudy, Comment, Category, Tag, Client

class BlogPostAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditor5Widget(config_name='extends'))
    class Meta:
        model = BlogPost
        fields = '__all__'

class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    list_display = ('title', 'author', 'status', 'is_published', 'published_at', 'views', 'featured')
    list_filter = ('status', 'is_published', 'featured', 'categories', 'tags')
    search_fields = ('title', 'content', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    raw_id_fields = ('author',)
    filter_horizontal = ('categories', 'tags')
    date_hierarchy = 'published_at'
    ordering = ('-published_at', '-created_at')
    readonly_fields = ('views', 'version')
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'content', 'excerpt', 'cover_image')
        }),
        ('Author & Categories', {
            'fields': ('author', 'categories', 'tags')
        }),
        ('Publishing', {
            'fields': ('status', 'is_published', 'published_at', 'featured')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description', 'schema_markup')
        }),
        ('Analytics', {
            'fields': ('views', 'version')
        }),
    )

class CaseStudyAdminForm(forms.ModelForm):
    content = forms.CharField(widget=CKEditor5Widget(config_name='extends'))
    results = forms.CharField(widget=CKEditor5Widget(config_name='extends'))
    class Meta:
        model = CaseStudy
        fields = '__all__'

class CaseStudyAdmin(admin.ModelAdmin):
    form = CaseStudyAdminForm
    list_display = ('title', 'client', 'industry', 'status', 'is_published', 'published_at', 'views', 'featured')
    list_filter = ('status', 'is_published', 'featured', 'industry', 'categories', 'tags')
    search_fields = ('title', 'content', 'excerpt')
    prepopulated_fields = {'slug': ('title',)}
    filter_horizontal = ('categories', 'tags')
    date_hierarchy = 'published_at'
    ordering = ('-published_at', '-created_at')
    readonly_fields = ('views', 'version')
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'content', 'excerpt', 'cover_image')
        }),
        ('Client & Categories', {
            'fields': ('client', 'industry', 'categories', 'tags')
        }),
        ('Results & Technologies', {
            'fields': ('key_results', 'technologies', 'testimonial')
        }),
        ('Publishing', {
            'fields': ('status', 'is_published', 'published_at', 'featured')
        }),
        ('SEO', {
            'fields': ('meta_title', 'meta_description', 'schema_markup')
        }),
        ('Analytics', {
            'fields': ('views', 'version')
        }),
    )

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'content_preview', 'blog_post', 'case_study', 'is_approved', 'is_spam', 'created_at')
    list_filter = ('is_approved', 'is_spam', 'created_at')
    search_fields = ('author__username', 'content')
    readonly_fields = ('ip_address', 'user_agent', 'created_at')
    actions = ['approve_comments', 'mark_as_spam']

    def content_preview(self, obj):
        return obj.content[:100] + '...' if len(obj.content) > 100 else obj.content
    content_preview.short_description = 'Content Preview'

    def approve_comments(self, request, queryset):
        queryset.update(is_approved=True, is_spam=False)
    approve_comments.short_description = "Approve selected comments"

    def mark_as_spam(self, request, queryset):
        queryset.update(is_approved=False, is_spam=True)
    mark_as_spam.short_description = "Mark selected comments as spam"

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order', 'name')

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('name',)

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('name', 'industry', 'is_active', 'created_at')
    list_filter = ('is_active', 'industry')
    search_fields = ('name', 'description')
    ordering = ('name',)

admin.site.register(BlogPost, BlogPostAdmin)
admin.site.register(CaseStudy, CaseStudyAdmin)
