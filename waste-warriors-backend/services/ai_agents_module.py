import os
import uuid
import requests
import logging
from datetime import datetime


# Setup logging
logging.basicConfig(level=logging.INFO,
                    format='%(asctime)s - %(levelname)s - %(message)s',
                    handlers=[
                        logging.FileHandler("voicemail_system.log"),
                        logging.StreamHandler()
                    ])


# AI Module for Summarizing Audio
def summarise_audio(audio_url):
    try:
        # Create a folder to store audio files if it doesn't exist
        folder = 'callAudio_files'
        if not os.path.exists(folder):
            os.makedirs(folder)

        # Generate a unique filename with date-time and UUID
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        unique_id = str(uuid.uuid4())[:8]
        filename = f'callAudio_{timestamp}_{unique_id}.mp3'
        filepath = os.path.join(folder, filename)

        # Get the audio file from the URL
        logging.info(f"Fetching audio file from {audio_url}")
        response = requests.get(audio_url)
        if response.status_code != 200:
            logging.error(f"Failed to download audio file. Status code: {response.status_code}")
            return "unknown"

        # Save the audio file locally
        with open(filepath, 'wb') as file:
            file.write(response.content)

        logging.info(f"Audio file saved to {filepath}")

        # Simulated AI result
        # In production, replace this with actual AI processing logic
        result = "incident"  # Mock result
        logging.info(f"AI processing completed. Result: {result}")

        # Remove the file after processing (optional)
        # os.remove(filepath)
        return result.lower().strip()

    except Exception as e:
        logging.error(f"Error processing audio file: {str(e)}")
        return "unknown"
