# -*- coding: utf-8 -*-
# Generated by Django 1.9.11 on 2016-12-01 18:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='username',
            field=models.CharField(default='', max_length=50),
        ),
    ]
