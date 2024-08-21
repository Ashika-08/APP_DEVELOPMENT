# Generated by Django 5.0.8 on 2024-08-10 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('country_code', models.CharField(default='IN', max_length=5)),
                ('whatsapp_number', models.CharField(max_length=20)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('icon', models.CharField(max_length=200)),
                ('title', models.CharField(max_length=200)),
                ('age', models.CharField(max_length=50)),
                ('description', models.TextField()),
                ('path', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Participant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('phone_number', models.CharField(blank=True, max_length=15, null=True, unique=True)),
                ('address', models.TextField(blank=True, null=True)),
                ('tournamentCode', models.CharField(max_length=10)),
                ('join_date', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'TournamentParticipants',
            },
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tournamentName', models.CharField(max_length=100)),
                ('organizerName', models.CharField(max_length=100)),
                ('category', models.CharField(choices=[('under 10', 'under 10'), ('under 18', 'under 18')], max_length=50)),
                ('mode', models.CharField(choices=[('online', 'Online'), ('offline', 'Offline')], max_length=10)),
                ('time', models.TimeField()),
                ('venue', models.CharField(blank=True, max_length=200, null=True)),
                ('batchSize', models.IntegerField(blank=True, null=True)),
                ('tournamentCode', models.CharField(max_length=10)),
                ('participantLimit', models.IntegerField()),
                ('participants', models.JSONField(default=list)),
            ],
        ),
    ]
