from flask_wtf import FlaskForm
from wtforms import TextAreaField
from flask_wtf.file import FileField, FileRequired
from wtforms.validators import DataRequired, Email

class UploadForm(FlaskForm):
    
    description = TextAreaField('description', validators=[DataRequired()])
    photo = FileField('image', validators=[FileRequired()])
