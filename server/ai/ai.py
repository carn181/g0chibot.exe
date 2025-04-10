from google import genai
from google.genai import types
import os

key=os.environ.get('GEMINI_API_KEY')
print("Your API_Key is: "+key)
client = genai.Client(api_key=key)


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


chat=Chatbot("2000's guy", "For any of the following messages, speak like a 18 year old l33t hacker boy on the 2000's internet. I will communicate with you like I'm on MySpace and you should respond like then. You should give me a fun fact of the 2000's internet as well when I ask. Never give huge paragraphs, and give new sentences on new lines.")
chat.init()

for i in range(10):
    message=input("Input: ")
    response = chat.send_msg(message)
    print(response.text)

