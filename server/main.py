from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import ai  # for chatbot class

app = Flask(__name__)
cors=CORS(app)

# dictionary to keep track of each chatbot by ID number
chat_sessions = {}

# path/route to create new chatbot
@app.route('/chatbot/<int:num>/initialize', methods=['POST'])
@cross_origin()
def initialize_chat(num):
    #  get data from frontend (name and personaility)
    data = request.get_json()
    name = data.get("name", f"Bot{num}")  # the default name if no name is given
    instr = data.get("instruction", "Default instruction.")  # placeholder/default instruction

    # makes a new chatbot using provided name and instruction
    bot = ai.chatbot1
    bot.init()  # sets up gemini chat session

    # saves chatbot and its message history in this session dictionary
    chat_sessions[num] = {
        "bot": bot,
        "history": []  # store the user/bot message pairs here
    }

    return jsonify({"message": f"Chatbot {num} ('{name}') initialized."})

# route to send a message to the chatbot and get its reply
@app.route('/chatbot/<int:num>/sendmsg', methods=['POST'])
@cross_origin()
def send_message(num):
    # check if the chatbot with that ID exists
    if num not in chat_sessions:
        return jsonify({"error": f"Chatbot {num} not initialized."}), 400

    # gets the user's msg from the frontend request
    user_msg = request.json.get('message', '')
    if not user_msg:
        return jsonify({"error": "No message provided."}), 400

    bot = chat_sessions[num]["bot"]  # get the chatbot instance #

    try:
        # send the user's msg to the bot and get its reply
        bot_reply = bot.send_msg(user_msg)

        # adds the pair(user's question, bot's reply) to the history
        chat_sessions[num]["history"].append({"user": user_msg, "bot": bot_reply})

        # returns the bot's reply to the frontend
        return jsonify({"response": bot_reply})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# route for info about a specific chatbot like name, msg count, and chat history
@app.route('/chatbot/<int:num>/information', methods=['GET'])
@cross_origin()
def get_info(num):
    if num not in chat_sessions:
        return jsonify({"error": f"Chatbot {num} not initialized."}), 400

    bot = chat_sessions[num]["bot"]

    return jsonify({
        "chatbot_id": num,
        "chatbot_name": bot.name,
        "instruction_snippet": bot.instr[:120] + "...",  # just shows part of the instructions
        "message_count": len(chat_sessions[num]["history"]),
        "history": chat_sessions[num]["history"]
    })

# route to list all active chatbots and basic info for each one for example: frontend dropdown
@app.route('/chatbot/all', methods=['GET'])
@cross_origin()
def list_all_chatbots():
    result = []
    for num, session in chat_sessions.items():
        bot = session["bot"]
        result.append({
            "chatbot_id": num,
            "chatbot_name": bot.name,
            "instruction_snippet": bot.instr[:100] + "...",
            "message_count": len(session["history"])
        })
    return jsonify(result)

# Starts the Flask app in debug mode (so you see errors printed)
if __name__ == '__main__':
    app.run(debug=True)
