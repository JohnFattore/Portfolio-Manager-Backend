# Generated by Django 5.0.4 on 2024-12-08 16:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='favorite',
            name='restaurant',
        ),
        migrations.RemoveField(
            model_name='historicalfavorite',
            name='restaurant',
        ),
        migrations.AddField(
            model_name='favorite',
            name='menu_item',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='restaurants.menuitem'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='historicalfavorite',
            name='menu_item',
            field=models.ForeignKey(blank=True, db_constraint=False, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='+', to='restaurants.menuitem'),
        ),
    ]