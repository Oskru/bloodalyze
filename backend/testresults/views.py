from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TestresultSerializer
from .models import Testresult

# Create your views here.

class TestresultView(viewsets.ModelViewSet):
    serializer_class = TestresultSerializer
    queryset = Testresult.objects.all()