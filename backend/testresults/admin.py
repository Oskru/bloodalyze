from django.contrib import admin
from .models import Testresults

# Register your models here.

class TestresultsAdmin(admin.ModelAdmin):
    list_display = ('date',)

admin.site.register(Testresults, TestresultsAdmin)