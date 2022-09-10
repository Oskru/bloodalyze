from rest_framework import serializers
from .models import Testresult

class TestresultSerializer(serializers.ModelSerializer):

    class Meta:
        model = Testresult
        fields = ('id', 'date_added', 'rbc_level', 'hgb_level', 'hct_level', 'mcv_level', 'mch_level', 'mchc_level', 'wbc_level', 'plt_level')