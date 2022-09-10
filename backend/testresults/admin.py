from django.contrib import admin
from .models import Testresult

# Register your models here.

class TestresultsAdmin(admin.ModelAdmin):
    list_display = ('date_added',)

admin.site.register(Testresult, TestresultsAdmin)