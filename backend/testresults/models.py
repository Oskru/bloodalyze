from django.db import models

# Create your models here.

class Testresults(models.Model):

    date_added = models.DateField(auto_now_add=True)
    rbc_level = models.DecimalField()
    hgb_level = models.DecimalField()
    hct_level = models.DecimalField()
    mcv_level = models.DecimalField()
    mch_level = models.DecimalField()
    mchc_level = models.DecimalField()
    wbc_level = models.DecimalField()
    plt_level = models.DecimalField()

    def __str__(self):
        return str(self.date_added)
