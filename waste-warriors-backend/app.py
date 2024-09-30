from flask import Flask, jsonify, request, abort
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  # Import CORS
import logging
from services.voice_module import VoiceService  # Import VoiceService class
from services.airtime_module import AirtimeService
import os

# Configure logging
logging.basicConfig(level=logging.INFO)

# Initialize the VoiceService with your Africa's Talking credentials
USERNAME = os.getenv('AT_USERNAME')  # Replace with your actual username
API_KEY = os.getenv('AT_API_KEY')    # Replace with your actual API key
voice_service = VoiceService(USERNAME, API_KEY)
airtime_service = AirtimeService(USERNAME, API_KEY)


# Initialize the Flask application
app = Flask(__name__)

# Enable CORS for the app
CORS(app)  # You can also pass specific configurations to CORS


# Configure the SQLite database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///waste_management.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the database
db = SQLAlchemy(app)

# Define the waste entry model
class WasteEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    waste_type = db.Column(db.String(50), nullable=False)
    quantity = db.Column(db.Float, nullable=False)
    location = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            'id': self.id,
            'waste_type': self.waste_type,
            'quantity': self.quantity,
            'location': self.location
        }

# Create the database tables
with app.app_context():
    db.create_all()

# Define API routes
@app.route('/hello_world', methods=['GET'])
def hello_world():
    message = "Hello Waste Warriors"
    return jsonify(message)

@app.route('/waste', methods=['GET'])
def get_waste_entries():
    entries = WasteEntry.query.all()
    return jsonify([entry.to_dict() for entry in entries])

@app.route('/waste', methods=['POST'])
def add_waste_entry():
    data = request.json
    print(data)
    new_entry = WasteEntry(
        waste_type=data['waste_type'],
        quantity=data['quantity'],
        location=data['location']
    )
    db.session.add(new_entry)
    db.session.commit()
    return jsonify(new_entry.to_dict()), 201

# New endpoint to get a specific waste entry by its ID
@app.route('/waste/<int:id>', methods=['GET'])
def get_waste_entry(id):
    entry = WasteEntry.query.get(id)
    if not entry:
        return abort(404, description="Waste entry not found")
    return jsonify(entry.to_dict())





def send_sms_alert(phone_number, textMessage=f"Alert: Your phone number has been flagged for SIM swap."):
    recipients = [phone_number]
    sender = os.getenv('AT_SMS_SENDER_CODE')  # Set the sender ID as needed
    try:
        response = send_sms_sync(textMessage, recipients, sender)
        logging.info(f"SMS sent successfully: {response}")
    except Exception as e:
        logging.error(f"Failed to send SMS: {str(e)}")

def build_response(response_string):
    response = '<?xml version="1.0" encoding="UTF-8"?>'
    response += '<Response>'
    response += response_string
    response += '</Response>'
    return response

@app.route('/reply_call_AFR', methods=['POST'])
def reply_call_AFR():
    session_id = request.values.get("sessionId", None)
    is_active = request.values.get("isActive", False)

    if is_active == "1":
        # Call is active
        caller_number = format_phone_number(request.values.get("callerNumber", None))
        dtmf_digits = request.values.get("dtmfDigits", None)

        if dtmf_digits is None:
            # First request, play welcome message
            response_string = '<GetDigits timeout="10" numDigits="1">'
            response_string += '<Say>Welcome to the WasteWarriors. '
            response_string += 'To speak to a WasteWarriors Agent, press 1. '
            response_string += 'To speak to an automated WasteWarriors system, press 2. '
            response_string += 'For other issues, press 3</Say>'
            response_string += '</GetDigits>'
        else:
            if dtmf_digits == "1":
                response_string = '<Say>Connecting you to the WasteWarriors Call center.</Say>'
                response_string += '<Dial phoneNumbers="+254758750620" />'
            elif dtmf_digits == "2":
                response_string = '<Say>Connecting you to a Waste Warriors agent.</Say>'
                response_string += '<Dial phoneNumbers="+254797329362" />'
            elif dtmf_digits == "3":
                response_string = '<Record finishOnKey="#" maxLength="10" trimSilence="true" playBeep="true">'
                response_string += '<Say>Please record your issue after the beep.</Say>'
                response_string +='</Record>'
            else:
                response_string = '<GetDigits timeout="10" numDigits="1">'
                response_string += '<Say>Invalid input. Please try again. '
                response_string += 'To speak to a WasteWarriors Agent, press 1. '
                response_string += 'To speak to an automated WasteWarriors system, press 2. '
                response_string += 'For other issues, press 3</Say>'
                response_string += '</GetDigits>'
        
        response = make_response(build_response(response_string))
        response.headers['Content-Type'] = 'text/xml'
        thankyoumessage = "Thank you for contacting WasteWarriors. We value your feedback"
        print(f"Sending message to {caller_number}")
        send_sms_alert(caller_number, thankyoumessage)
        return response
    else:
        # Call is not active
        return "OK"


def format_phone_number(phone_number):
    """
    Ensure phone number is in the correct format (+254 without leading zero after +).
    """
    if phone_number.startswith("+0"):
        # Remove the "0" after the "+"
        return "+" + phone_number[2:]
    return phone_number





if __name__ == '__main__':
    app.run(debug=True)
