from __future__ import print_function
import africastalking

class VoiceService:
    def __init__(self, username, api_key):
        # Set your app credentials
        self.username = username
        self.api_key = api_key
        # Initialize the SDK
        africastalking.initialize(self.username, self.api_key)
        # Get the voice service
        self.voice = africastalking.Voice

    def make_call(self, call_to, call_from="+254111052355"):
        try:
            # Make the call
            result = self.voice.call(call_from, call_to)
            print(result)
        except Exception as e:
            print("Encountered an error while making the call: %s" % str(e))


if __name__ == '__main__':
    # Replace the following with your actual Africa's Talking credentials and phone numbers
    username = "YOUR_USERNAME"
    api_key = "YOUR_API_KEY"
    call_from = "+254711082XXX"  # Your Africa's Talking phone number
    call_to = ["+254711XXXYYY"]  # The numbers you want to call

    # Initialize the VoiceService with your credentials
    voice_service = VoiceService(username, api_key)

    # Make the call
    voice_service.make_call(call_from, call_to)
