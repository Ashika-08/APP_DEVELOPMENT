# Generated by Django 5.0.8 on 2024-08-10 14:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tournaments', '0003_pricing'),
    ]

    operations = [
        migrations.CreateModel(
            name='Carousel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_path', models.CharField(max_length=255)),
            ],
        ),
    ]
