from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from content_app.models import Category, Tag, BlogPost, CaseStudy, Client
from datetime import timedelta

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate database with sample data for development'

    def handle(self, *args, **options):
        self.stdout.write('Creating sample data...')
        
        # Create admin user if it doesn't exist
        admin_user, created = User.objects.get_or_create(
            username='admin',
            defaults={
                'email': 'admin@victoai.com',
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write('Created admin user: admin/admin123')
        
        # Create categories
        categories = []
        category_data = [
            {'name': 'AI Security', 'description': 'Artificial Intelligence Security'},
            {'name': 'Cybersecurity', 'description': 'General Cybersecurity'},
            {'name': 'Machine Learning', 'description': 'Machine Learning Security'},
            {'name': 'Privacy', 'description': 'Data Privacy and Protection'},
        ]
        
        for cat_data in category_data:
            category, created = Category.objects.get_or_create(
                name=cat_data['name'],
                defaults={
                    'description': cat_data['description'],
                    'is_active': True
                }
            )
            categories.append(category)
            if created:
                self.stdout.write(f'Created category: {category.name}')
        
        # Create tags
        tags = []
        tag_data = ['AI', 'Security', 'Privacy', 'ML', 'Cybersecurity', 'Testing']
        
        for tag_name in tag_data:
            tag, created = Tag.objects.get_or_create(name=tag_name)
            tags.append(tag)
            if created:
                self.stdout.write(f'Created tag: {tag.name}')
        
        # Create clients
        clients = []
        client_data = [
            {'name': 'TechCorp', 'industry': 'Technology'},
            {'name': 'FinanceBank', 'industry': 'Finance'},
            {'name': 'HealthCare Inc', 'industry': 'Healthcare'},
        ]
        
        for client_data_item in client_data:
            client, created = Client.objects.get_or_create(
                name=client_data_item['name'],
                defaults={
                    'industry': client_data_item['industry'],
                    'is_active': True
                }
            )
            clients.append(client)
            if created:
                self.stdout.write(f'Created client: {client.name}')
        
        # Create sample blog posts
        blog_posts = []
        blog_data = [
            {
                'title': 'Introduction to AI Security',
                'excerpt': 'Learn the fundamentals of securing artificial intelligence systems',
                'content': '<p>This is a comprehensive guide to AI security...</p>',
                'read_time': 5,
                'featured': True,
            },
            {
                'title': 'Privacy Testing for AI Models',
                'excerpt': 'How to test AI models for privacy vulnerabilities',
                'content': '<p>Privacy testing is crucial for AI systems...</p>',
                'read_time': 8,
                'featured': False,
            },
            {
                'title': 'ML Model Security Best Practices',
                'excerpt': 'Essential security practices for machine learning models',
                'content': '<p>Securing ML models requires careful attention...</p>',
                'read_time': 6,
                'featured': True,
            }
        ]
        
        for i, blog_data_item in enumerate(blog_data):
            blog_post, created = BlogPost.objects.get_or_create(
                title=blog_data_item['title'],
                defaults={
                    'slug': f'sample-blog-{i+1}',
                    'excerpt': blog_data_item['excerpt'],
                    'content': blog_data_item['content'],
                    'author': admin_user,
                    'read_time': blog_data_item['read_time'],
                    'featured': blog_data_item['featured'],
                    'is_published': True,
                    'published_at': timezone.now() - timedelta(days=i+1),
                    'allow_comments': True,
                }
            )
            blog_post.categories.set([categories[0], categories[1]])  # AI Security, Cybersecurity
            blog_post.tags.set([tags[0], tags[1]])  # AI, Security
            blog_posts.append(blog_post)
            if created:
                self.stdout.write(f'Created blog post: {blog_post.title}')
        
        # Create sample case studies
        case_study_data = [
            {
                'title': 'AI Model Security Assessment for TechCorp',
                'excerpt': 'Comprehensive security assessment of AI models in production',
                'content': '<p>This case study covers our work with TechCorp...</p>',
                'read_time': 10,
                'featured': True,
                'industry': categories[0],  # AI Security
                'key_results': [
                    {'title': 'Vulnerability Detection', 'description': 'Identified 15 critical security vulnerabilities'},
                    {'title': 'Risk Mitigation', 'description': 'Implemented security controls reducing risk by 85%'}
                ],
                'technologies': ['AI/ML', 'Security Testing', 'Penetration Testing'],
            },
            {
                'title': 'Privacy Testing for FinanceBank ML Systems',
                'excerpt': 'Privacy vulnerability assessment in financial AI systems',
                'content': '<p>FinanceBank needed to ensure their AI systems...</p>',
                'read_time': 12,
                'featured': False,
                'industry': categories[1],  # Cybersecurity
                'key_results': [
                    {'title': 'Privacy Assessment', 'description': 'Comprehensive privacy testing revealed data leakage risks'},
                    {'title': 'Risk Prevention', 'description': 'Prevented potential data breaches worth millions'}
                ],
                'technologies': ['Privacy Testing', 'AI Security', 'Data Protection'],
            }
        ]
        
        for i, case_data in enumerate(case_study_data):
            case_study, created = CaseStudy.objects.get_or_create(
                title=case_data['title'],
                defaults={
                    'slug': f'sample-case-study-{i+1}',
                    'excerpt': case_data['excerpt'],
                    'content': case_data['content'],
                    'client': clients[i],
                    'industry': case_data['industry'],
                    'read_time': case_data['read_time'],
                    'featured': case_data['featured'],
                    'is_published': True,
                    'published_at': timezone.now() - timedelta(days=i+2),
                    'allow_comments': True,
                    'key_results': case_data['key_results'],
                    'technologies': case_data['technologies'],
                }
            )
            case_study.categories.set([categories[0], categories[2]])  # AI Security, ML
            case_study.tags.set([tags[0], tags[1], tags[4]])  # AI, Security, Cybersecurity
            if created:
                self.stdout.write(f'Created case study: {case_study.title}')
        
        self.stdout.write(self.style.SUCCESS('Sample data created successfully!'))
        self.stdout.write(f'Created: {len(categories)} categories, {len(tags)} tags, {len(blog_posts)} blog posts, {len(case_study_data)} case studies')
