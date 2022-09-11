from django.db import models

# Create your models here.

class Testresult(models.Model):

    date_added = models.DateField(auto_now_add=True)
    test_date = models.DateField(null=False)
    rbc_level = models.DecimalField(max_digits=10, decimal_places=2)
    hgb_level = models.DecimalField(max_digits=10, decimal_places=2)
    hct_level = models.DecimalField(max_digits=10, decimal_places=2)
    mcv_level = models.DecimalField(max_digits=10, decimal_places=2)
    mch_level = models.DecimalField(max_digits=10, decimal_places=2)
    mchc_level = models.DecimalField(max_digits=10, decimal_places=2)
    wbc_level = models.DecimalField(max_digits=10, decimal_places=2)
    plt_level = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.date_added)
