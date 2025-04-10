from google import genai
from google.genai import types
import os

key=os.environ.get('GEMINI_API_KEY')
if key is not None:
    print("Your API_Key is: " + key)
else:
    print("API_Key is not set.")

client = genai.Client(api_key = key)




class Chatbot:
    def __init__(self, name, instr):
        self.name=name
        self.instr=instr
        self.chat=None
        
    def init(self):
        self.chat= client.chats.create(model="gemini-2.0-flash",
                                       config=types.GenerateContentConfig(
                                           system_instruction=self.instr))
    def send_msg(self,msg):
        response=self.chat.send_message(msg)
        return response

