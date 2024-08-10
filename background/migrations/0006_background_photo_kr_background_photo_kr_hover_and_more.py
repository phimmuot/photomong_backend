# Generated by Django 4.1.2 on 2024-04-15 09:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('background', '0005_remove_background_frame_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='background',
            name='photo_kr',
            field=models.ImageField(default='backgrounds/default.png', upload_to='backgrounds'),
        ),
        migrations.AddField(
            model_name='background',
            name='photo_kr_hover',
            field=models.ImageField(default='backgrounds/default.png', upload_to='backgrounds'),
        ),
        migrations.AddField(
            model_name='background',
            name='photo_vn',
            field=models.ImageField(default='backgrounds/default.png', upload_to='backgrounds'),
        ),
        migrations.AddField(
            model_name='background',
            name='photo_vn_hover',
            field=models.ImageField(default='backgrounds/default.png', upload_to='backgrounds'),
        ),
    ]
