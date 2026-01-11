from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Category, Tag, BlogPost, CaseStudy, 
    Client, Comment
)
from django.utils import timezone

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
        ref_name = "ContentAppUserSerializer"

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['slug']

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'
        read_only_fields = ['slug']

class ClientSerializer(serializers.ModelSerializer):
    industry = serializers.CharField(read_only=True)  # Keep as string since model field is CharField

    class Meta:
        model = Client
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    replies = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = [
            'id', 'content', 'author', 'created_at', 'updated_at',
            'is_approved', 'parent_comment', 'replies'
        ]
        read_only_fields = ['id', 'author', 'created_at', 'updated_at', 'is_approved']

    def get_replies(self, obj):
        if obj.parent_comment is None:  # Only get replies for top-level comments
            replies = Comment.objects.filter(parent_comment=obj, is_approved=True)
            return CommentSerializer(replies, many=True).data
        return []

    def validate(self, data):
        if not data.get('blog_post') and not data.get('case_study'):
            raise serializers.ValidationError(
                "Comment must be associated with either a blog post or case study"
            )
        if data.get('blog_post') and data.get('case_study'):
            raise serializers.ValidationError(
                "Comment cannot be associated with both a blog post and case study"
            )
        return data

class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='categories',
        write_only=True,
        many=True
    )
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        many=True
    )
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'cover_image',
            'author', 'categories', 'category_ids', 'tags', 'tag_ids',
            'read_time', 'views', 'featured', 'allow_comments',
            'meta_title', 'meta_description', 'schema_markup',
            'version', 'status', 'created_at', 'updated_at',
            'published_at', 'is_published', 'comments', 'comment_count'
        ]
        read_only_fields = [
            'id', 'slug', 'author', 'views', 'version',
            'created_at', 'updated_at', 'published_at'
        ]

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()

    def validate(self, data):
        if data.get('is_published') and not data.get('published_at'):
            data['published_at'] = timezone.now()
        return data

class CaseStudySerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(),
        source='client',
        write_only=True
    )
    industry = CategorySerializer(read_only=True)
    industry_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='industry',
        write_only=True
    )
    categories = CategorySerializer(many=True, read_only=True)
    category_ids = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source='categories',
        write_only=True,
        many=True
    )
    tags = TagSerializer(many=True, read_only=True)
    tag_ids = serializers.PrimaryKeyRelatedField(
        queryset=Tag.objects.all(),
        source='tags',
        write_only=True,
        many=True
    )
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'slug', 'content', 'excerpt', 'cover_image',
            'client', 'client_id', 'industry', 'industry_id',
            'categories', 'category_ids', 'tags', 'tag_ids',
            'read_time', 'views', 'featured',
            'meta_title', 'meta_description', 'schema_markup',
            'version', 'status', 'created_at', 'updated_at',
            'published_at', 'is_published', 'key_results',
            'technologies', 'testimonial', 'comments', 'comment_count'
        ]
        read_only_fields = [
            'id', 'slug', 'views', 'version',
            'created_at', 'updated_at', 'published_at'
        ]

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()

    def validate(self, data):
        if data.get('is_published') and not data.get('published_at'):
            data['published_at'] = timezone.now()
        return data

class BlogPostListSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'cover_image',
            'author', 'categories', 'tags', 'read_time',
            'views', 'featured', 'created_at', 'published_at',
            'comment_count'
        ]
        read_only_fields = fields

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count()

class CaseStudyListSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    industry = CategorySerializer(read_only=True)
    categories = CategorySerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = CaseStudy
        fields = [
            'id', 'title', 'slug', 'excerpt', 'cover_image',
            'client', 'industry', 'categories', 'tags',
            'read_time', 'views', 'featured', 'created_at',
            'published_at', 'comment_count'
        ]
        read_only_fields = fields

    def get_comment_count(self, obj):
        return obj.comments.filter(is_approved=True).count() 