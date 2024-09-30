import africastalking

class AirtimeService:
    def __init__(self, username, api_key):
        # Initialize the SDK
        africastalking.initialize(username, api_key)
        # Initialize the airtime service
        self.airtime = africastalking.Airtime

    def send_airtime(self, phone_number, amount, currency_code="KES"):
        try:
            response = self.airtime.send(phone_number=phone_number, amount=amount, currency_code=currency_code)
            print(f"Airtime sent successfully: {response}")
            return response
        except Exception as e:
            print(f"Failed to send airtime: {str(e)}")
            return None
