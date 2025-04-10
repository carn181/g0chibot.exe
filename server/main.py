from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "AI Chatbot Backend is running!"

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message', '')
    # Fake response for now, replace this with AI logic later
    bot_response = f"You said: {user_message}"
    return jsonify({"response": bot_response})

if __name__ == '__main__':
    app.run(debug=True)