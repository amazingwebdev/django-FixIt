# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-02-05 17:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transcript', '0029_auto_20180202_2014'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='transcriptphrase',
            index=models.Index(fields=['current_game', 'active'], name='transcript__current_d830c6_idx'),
        ),
    ]
