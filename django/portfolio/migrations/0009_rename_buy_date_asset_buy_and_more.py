# Generated by Django 4.1.7 on 2024-01-07 00:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0008_delete_userinfo_rename_user_key_asset_user_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='asset',
            old_name='buy_date',
            new_name='buy',
        ),
        migrations.RenameField(
            model_name='asset',
            old_name='costbasis_number',
            new_name='costbasis',
        ),
        migrations.RenameField(
            model_name='asset',
            old_name='shares_number',
            new_name='shares',
        ),
        migrations.RenameField(
            model_name='asset',
            old_name='ticker_string',
            new_name='ticker',
        ),
        migrations.RemoveField(
            model_name='asset',
            name='account_string',
        ),
    ]
