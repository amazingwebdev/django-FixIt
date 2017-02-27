# -*- coding: utf-8 -*-
# Generated by Django 1.9.12 on 2017-02-27 21:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('transcript', '0005_transcriptphrase_confidence'),
    ]

    operations = [
        migrations.AddField(
            model_name='transcriptphrasecorrection',
            name='not_an_error',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='transcriptphrasecorrection',
            name='confidence',
            field=models.FloatField(default=0),
        ),
    ]
