# Import necessary packages
import africastalking
from dotenv import load_dotenv
import os
import logging


# Configure logging
logging.basicConfig(level=logging.INFO)

# Load environment variables from .env file
load_dotenv()
# Get credentials from environment variables
sms_username = os.getenv('AT_USERNAME')                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
sms_api_key = os.getenv('AT_API_KEY')
sms_sender_code = os.getenv('AT_SMS_SENDER_CODE', "AFTKNG")
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
# Initialize SDK
africastalking.initialize(sms_username, sms_api_key)
logging.info("SMS module initialized")

# Initialize a service e.g. SMS
sms = africastalking.SMS

def send_sms_sync(message, recipients, sender=sms_sender_code ):
    """
    Send an SMS synchronously.

    :param message: The message to send
    :param recipients: List of recipient phone numbers
    :param sender: Sender ID (optional)
    :return: Response from the API
    """
    response = sms.send(message, recipients, sender_id=sender)
    return response


def send_sms_async(message, recipients, callback, sender_id):
    """
    Send an SMS asynchronously.

    :param message: The message to send
    :param recipients: List of recipient phone numbers
    :param callback: The callback function to execute on completion
    :param sender: Sender ID (optional)
    """
    sms.send(message, recipients, callback=callback, sender_id=sender_id)

def on_finish(error, response):
    """
    Default callback function for asynchronous SMS sending.

    :param error: Error if any occurred
    :param response: Response from the API
    """
    if error is not None:
        raise error
    print(response)
