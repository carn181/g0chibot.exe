import React from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Window,
  WindowHeader,
  WindowContent,
  List,
  TextInput,
  ListItem,
  TextField,
  styleReset,
} from 'react95';
import { createGlobalStyle, ThemeProvider, styled } from 'styled-components';
import { StyleSheetManager } from 'styled-components';
import {useState} from 'react';
import isPropValid from '@emotion/is-prop-valid';
/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import axios from 'axios';

// This implements the default behavior from styled-components v5
function shouldForwardProp(propName, target) {
    if (typeof target === "string") {
        // For HTML elements, forward the prop if it is a valid HTML attribute
        return isPropValid(propName);
    }
    // For other elements, forward all props
    return true;
}



const GlobalStyles = createGlobalStyle`
  ${styleReset}
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif}') format('woff2');
    font-weight: 400;
    font-style: normal
  }
  @font-face {
    font-family: 'ms_sans_serif';
    src: url('${ms_sans_serif_bold}') format('woff2');
    font-weight: bold;
    font-style: normal
  }
  body, input, select, textarea {
    font-family: 'ms_sans_serif';
  }
`;




// Styled-components for layout
const AppLayout = styled.div`
display: flex;
flex-direction: column;
height: 100vh;
`;

const ContentLayout = styled.div`
display: flex;
flex: 1;
overflow: hidden;
`;

const BuddyListContainer = styled.div`
width: 250px;
overflow-y: auto;
border-right: 2px solid #000;
`;

const ChatWindowContainer = styled.div`
flex: 1;
padding: 10px;
display: flex;
flex-direction: column;
`;

const MessageInputContainer = styled.div`
display: flex;
align-items: center;
margin-top: 10px;
`;

const MessageInputField = styled(TextInput)`
flex: 1;
margin-right: 10px;
`;


let chatstarted = false;

const App = () => {
   const [messages, setMessages] = useState([
     //    { text: 'Hey, how are you?', type: 'sent' },
  ]);

  const [currentMessage, setCurrentMessage] = useState('');

  const buddies = ['Alice', 'Bob', 'Charlie'];
  const num = 1;
  const url = "http://localhost:5000"
  async function initBot(){
    axios.post(url+"/chatbot/"+num+"/initialize", {
      firstName: 'Fred',
      lastName: 'Flintstone'
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


  async function sendMsgBot(msg: string): Promise<string>{
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
  }  

  
  async function handleSend() {
    if (currentMessage.trim()) {
      setMessages([...messages, { text: currentMessage, type: 'sent' }]);
      var response
      if (!chatstarted) {
        initBot()
        chatstarted=true 
      }
      if(chatstarted){
        response= await sendMsgBot(currentMessage)
        console.log(response)
      }

        if (response != null) {
          setMessages([...messages,{ text: currentMessage, type: 'sent' }, { text: response, type: 'received' }]);
        }
      setCurrentMessage('');
    }
  };
  
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        <div>
            <GlobalStyles />
            <ThemeProvider theme={original}>
                <AppLayout>
                    {/* Header Bar */}
                    <AppBar>
                        <Toolbar>
                            <Button variant="menu">File</Button>
                            <Button variant="menu">Edit</Button>
                            <Button variant="menu">Help</Button>
                        </Toolbar>
                    </AppBar>

                    <ContentLayout>
                        {/* Buddy List */}
                        <BuddyListContainer>
                            <Window style={{ margin: '10px' }}>
                                <WindowHeader>g0chib0t.exe</WindowHeader>
                                <WindowContent>
                                    <List>
                                        {buddies.map((buddy, index) => (
                                            <ListItem key={index}>{buddy}</ListItem>
                                        ))}
                                    </List>
                                </WindowContent>
                            </Window>
                        </BuddyListContainer>

                        {/* Chat Window */}
                          <ChatWindowContainer style={{ width: '50%' }}>
                            <Window style={{ flex: 1, marginBottom: '10px' }}>
                                <WindowHeader>Chat with Scenezuki</WindowHeader>
                                <WindowContent style={{ flex: 1, overflowY: 'auto' }}>
                                    {messages.map((message, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                textAlign: message.type === 'sent' ? 'right' : 'left',
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
                                                {message.text}
                                            </div>
                                        </div>
                                    ))}
                                </WindowContent>
                            </Window>

                            {/* Message Input */}
                            <MessageInputContainer>
                                <MessageInputField
                                    placeholder="Type your message..."
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                />
                                <Button onClick={handleSend}>Send</Button>
                            </MessageInputContainer>
                        </ChatWindowContainer>
                    </ContentLayout>
                </AppLayout>
            </ThemeProvider>
        </div>
    </StyleSheetManager>
    )
};

export default App;
