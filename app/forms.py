from flask_wtf import FlaskForm
from wtforms import TextAreaField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Email

class UploadForm(FlaskForm):
    
    description = TextAreaField('Description', validators=[DataRequired()])
    photo = FileField('Image', validators=[FileRequired()])
