# Generated by Django 4.1.7 on 2024-04-01 23:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wallstreet', '0010_rename_userweeklyresult_result'),
    ]

    operations = [
        migrations.DeleteModel(
            name='AltBenchMark',
        ),
        migrations.AddField(
            model_name='option',
            name='name',
            field=models.CharField(default='OLD', max_length=1000),
        ),
    ]