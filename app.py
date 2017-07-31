import os
from flask import Flask, render_template, request
import subprocess
import threading
import requests
import time

app = Flask(__name__)

current_speaker = 0

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/get-speaker")
def get_speaker():
    return str(current_speaker)

def check_voice():
    global current_speaker

    speaker_zero_id = os.environ['SPEAKER_ZERO_ID'] # ben
    speaker_one_id = os.environ['SPEAKER_ONE_ID'] # cathy

    while True:
        try:
            subprocess.call('rm recording.wav', shell=True)
            subprocess.call('rm recording_final.wav', shell=True)
            subprocess.call('sox -d recording.wav trim 0 3', shell=True)
            subprocess.call('ffmpeg -i recording.wav -acodec pcm_s16le -ac 1 -ar 16000 recording_final.wav', shell=True)
            with open('recording_final.wav', 'rb') as f:
                r1 = requests.post(
                    'https://westus.api.cognitive.microsoft.com/spid/v1.0/identify?identificationProfileIds={},{}&shortAudio=true'.format(speaker_zero_id, speaker_one_id),
                    files={'recording_final.wav': f},
                    headers={'Ocp-Apim-Subscription-Key': os.environ['AZURE_KEY']}
                )
                query_url = r1.headers['Operation-Location']
                r2 = None

                while r2 is None or r2.json()['status'] != 'succeeded':
                    time.sleep(1.5)

                    r2 = requests.get(
                        query_url,
                        headers={'Ocp-Apim-Subscription-Key': ''}
                    )

                speaker_id = r2.json()['processingResult']['identifiedProfileId']
                if speaker_id == speaker_zero_id:
                    current_speaker = 0
                    print('****** speaker is ben ******')
                elif speaker_id == speaker_one_id:
                    print('****** speaker is cathy ******')
                    current_speaker = 1
                else:
                    print('****** neither speaker identified - keeping speaker as {} ******'.format(current_speaker))
        except:
            print 'brokey broke'

if __name__ == '__main__':
    # threading.Thread(target=check_voice).start()
    app.run(debug=True, use_reloader=False)
