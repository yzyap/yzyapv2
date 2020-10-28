from django import forms
from django.forms import Form

class CodeExecutorForm(Form):
    code = forms.CharField(widget=forms.Textarea(attrs={"rows":20, "cols":120}))

class NesneOgrenmeForm(Form):
    form_x=forms.CharField(label='x')
    form_y=forms.CharField(label='y')
    form_width=forms.CharField(label='width')
    form_height=forms.CharField(label='height')
    form_etiket=forms.CharField(label='etiket')