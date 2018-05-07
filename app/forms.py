from flask_wtf import FlaskForm
from wtforms import TextAreaField
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import validators 

class UploadForm(FlaskForm):
    description = TextAreaField('Description',[validators.Required("Description needed")])
    photo = FileField('Image',validators = [FileRequired(),FileAllowed(['jpg','png','jpeg'])])    
