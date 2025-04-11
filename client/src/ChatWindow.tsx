import {
  Button,
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
  ScrollView,
} from 'react95';
import { useState, useRef } from 'react';
import Draggable from 'react-draggable';
import { styled } from 'styled-components';
/* Pick a theme of your choice */

/* Original Windows95 font (optional) */
import axios from 'axios';




// Styled-components for layout
const ChatWindowContainer = styled.div`
flex: 1;
padding: 10px;
display: flex;
flex-direction: column;
flex-grow: true;
`;

const MessageInputContainer = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
margin-bottom: auto;
flex-grow: true;
`;

const MessageInputField = styled(TextInput)`
flex: 1;
margin-right: 10px;
`;


let chatstarted = false;

const ChatWindow = ({ botType, currNum }: { botType: string, currNum: int }) => {
    const [messages, setMessages] = useState([]
        //    { text: 'Hey, how are you?', type: 'sent' },

    );
    const [currentMessage, setCurrentMessage] = useState('');

    const num = 1;
    const url = "http://localhost:5000"
    async function initBot() {
        axios.post(url + "/chatbot/" + num + "/initialize", {
            type: "scenezuki"
        }, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
            },

        }
        )
            .then(function (response) {
                console.log(response.data.message);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    async function getNumMessages() {
        try {
          const resp = await axios.get(url + "/chatbot/" + currNum + "/information")
          console.log(resp.data.history);
          if (resp.data.history != null) {
            let msgs=[]
            resp.data.history.map((o) =>{
              msgs.push({ "type": "sent", text: o.user });
              msgs.push({"type": "received", text: o.bot })
            })
            console.log(JSON.stringify(msgs));
            setMessages(msgs);
          }
            if (resp.data.available_types != null) { console.log(resp.data.history) };
        } catch (err) {
            console.log(err);
        }
        return Promise.resolve([]);
    }

  async function sendMsgBot(msg: string): Promise<string> {
    try {
      const resp = await axios.post(url + "/chatbot/" + num + "/sendmsg", { message: msg, },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        })
      return resp.data.response;
    } catch (err) {
      console.log(err);

    }
    return Promise.resolve("")
  }


  async function handleSend() {
    if(messages == null) {
      await getNumMessages();
      console.log(messages);
    }
    if (currentMessage.trim()) {
      setMessages([...messages, { text: currentMessage, type: 'sent' }]);
      var response
      if (!chatstarted) {
        initBot()
        chatstarted = true
        
      }
      if (chatstarted) {
        
        response = await sendMsgBot(currentMessage)
        //        console.log(response)
      }

      if (response != null) {
        setMessages([...messages, { text: currentMessage, type: 'sent' }, { text: response, type: 'received' }]);
      }
      setCurrentMessage('');
    }
  };
  const nodeRef = useRef(null);
  return (
    <>
      <Draggable nodeRef={nodeRef}>
        <ChatWindowContainer ref={nodeRef}>
          <Window style={{ flex: 1, marginBottom: '10px', width: '800px', height: '100%'}}>
                      <WindowHeader>Chat with {botType}</WindowHeader>
            <WindowContent style={
              { flex: 1,
                overflowY: 'auto',
                height: '80%',
                backgroundColor: 'white'}}>
              <ScrollView>
              {/*
              OLD STYLE 
              {messages.map((message: {type: string, text: string}, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: message.type === 'sent' ? 'left' : 'left',
                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      backgroundColor: message.type === 'sent' ? '#c3f7c3' : '#e7e7e7',
                      padding: '5px 10px',
                      borderRadius: '5px',
                    }}
                  >
                    {message.type === 'sent' ? "Me:  ":botType+":  "}
                    {message.text}
                  </div>
                </div>
              ))}
                */}
              {/*AOL Style*/}
              {messages.map((message: {type: string, text: string}, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: message.type === 'sent' ? 'left' : 'left',
                    //                    marginBottom: '10px',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      //                backgroundColor: message.type === 'sent' ? '#c3f7c3' : '#e7e7e7',
                      padding: '5px 10px',
                     borderRadius: '5px',
                    }}
                  >
                    <div style={
                      {display: "inline",
                        color: message.type === 'sent' ? "blue":"red",
                        fontSize: "1.1em",
                        fontWeight: "bold"
                      }}>
                      {message.type === 'sent' ? "Me:  ":botType+":  "}
                    </div>
                    {message.text}
                  </div>
                </div>
              ))}
              </ScrollView>
            </WindowContent>
            <MessageInputContainer>
              <MessageInputField
                placeholder="Type your message..."
                value={currentMessage}
                onChange={(e: Event) => setCurrentMessage(e.target.value)}
              />
              <Button onClick={handleSend}>Send</Button>
            </MessageInputContainer>
          </Window>

          {/* Message Input */}

        </ChatWindowContainer>
      </Draggable>
    </>
  )
}

export default ChatWindow;
