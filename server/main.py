from flask import Flask, request, jsonify
from google import genai
from google.genai import types
import os
import ai

app = Flask(__name__)


# Session store for multiple chatbots
chat_sessions = {}

# config to tell the ai chatbot 
system_instruction = (
    "For any of the following messages, speak like an 18 year old l33t hacker boy on the 2000's internet. "
    "I will communicate with you like I'm on MySpace and you should respond like then. "
    "You should give me a fun fact of the 2000's internet as well when I ask. "
    "Never give huge paragraphs, and give new sentences on new lines."
)
@app.route('/chatbot/<int:num>/initialize', methods=['POST'])
def initialize_chat(num):
    # Create Gemini chat with style
    chat_sessions[num] = {
        "chat": [],
        "history": []
    }
    ai.chatbot1.init()
    return jsonify({"message": f"Chatbot {num} initialized."})

@app.route('/chatbot/<int:num>/sendmsg', methods=['POST'])
def send_message(num):
    if num not in chat_sessions:
        return jsonify({"error": f"Chatbot {num} not initialized."}), 400

    user_msg = request.json.get('message', '')
    if not user_msg:
        return jsonify({"error": "No message provided."}), 400

    chat = chat_sessions[num]["chat"]

    try:
        response = ai.chatbot1.send_msg(user_msg)
        bot_reply = response
        chat_sessions[num]["history"].append({"user": user_msg, "bot": bot_reply})
        return jsonify({"response": bot_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/chatbot/<int:num>/information', methods=['GET'])
def get_info(num):
    if num not in chat_sessions:
        return jsonify({"error": f"Chatbot {num} not initialized."}), 400

    return jsonify({
        "chatbot_id": num,
        "message_count": len(chat_sessions[num]["history"]),
        "history": chat_sessions[num]["history"]
    })

if __name__ == '__main__':
    app.run(debug=True)
