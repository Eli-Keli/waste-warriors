# from config import Config
import logging
import time
import requests
import os
from services.sms_module import send_sms_sync, send_sms_async

# Configure logging
logging.basicConfig(level=logging.INFO)

def send_sms_alert(phone_number, textMessage=f"Alert: Your phone number has been flagged for SIM swap."):
    recipients = [phone_number]
    sender = os.getenv('AT_SMS_SENDER_CODE')  # Set the sender ID as needed
    try:
        response = send_sms_sync(textMessage, recipients, sender)
        logging.info(f"SMS sent successfully: {response}")
    except Exception as e:
        logging.error(f"Failed to send SMS: {str(e)}")


def send_request_to_make_call(phone_number, sleep_duration=5):
    url = "https://stimaingine-backend.onrender.com/make_call"
    payload = {
        "call_to": str(phone_number)
    }
    headers = {'Content-Type': 'application/json'}

    # Add a sleep duration before making the request
    time.sleep(sleep_duration)

    # Send a POST request to the /make_call endpoint
    response = requests.post(url, json=payload, headers=headers)

    # Print the response from the endpoint
    print(response.json())


# Mock database functions
def get_account_info(phone_number):
    account_info = f"{phone_number} account number is ACC1001"
    return account_info

def get_account_balance(phone_number):
    return f"{phone_number} account balance is KES 10,000"

def request_customer_care_call(phone_number):
    message = f"Your Customer care call request has been queud.We are contacting you shortly. I we have not contacted you please call +254111052355"
    send_sms_alert(phone_number, message)
    send_request_to_make_call(phone_number)
    return message

# Define a dictionary for USSD responses
responses = {
    "": "CON Welcome to StimaIngine \nWhat would you want to check \n1. My Account \n2. My phone number\n3. Help and Support",
    "1": "CON Choose account information you want to view \n1. Account Info \n2. Account Token balance",
    "2": lambda phone_number: f'END Your phone number is {phone_number}',
    "1*1": lambda phone_number: f'END Your account Infor is {get_account_info(phone_number)}',
    "1*2": lambda phone_number: f'END Your balance is {get_account_balance(phone_number)}',
    "3": lambda phone_number: f'END Hey {request_customer_care_call(phone_number)}'
}

def handle_ussd_request(text, phone_number):
    # Get the response from the dictionary
    response = responses.get(text, "END Invalid choice")

    # If response is a callable (function), call it with phone_number
    if callable(response):
        response = response(phone_number)

    return response