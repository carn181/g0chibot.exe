import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  Window,
  WindowHeader,
  WindowContent,
  List,
  ListItem,
  TextField,
  styleReset,
} from 'react95';
import original from 'react95/dist/themes/original';
import {ThemeProvider, createGlobalStyle, styled} from 'styled-components';
/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

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

const MessageInputField = styled(TextField)`
flex: 1;
margin-right: 10px;
`;

const RetroAOLUIReact95 = () => {
  const [messages, setMessages] = useState([
    { text: 'Hi there!', type: 'received' },
    { text: 'Hey, how are you?', type: 'sent' },
  ]);

  const [currentMessage, setCurrentMessage] = useState('');

  const buddies = ['Alice', 'Bob', 'Charlie'];

  const handleSend = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, { text: currentMessage, type: 'sent' }]);
      setCurrentMessage('');
    }
  };

  return (
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
              <WindowHeader>Buddies.exe</WindowHeader>
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
          <ChatWindowContainer>
            <Window style={{ flex: 1, marginBottom: '10px' }}>
              <WindowHeader>Chat with Alice</WindowHeader>
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
  );
};

export default RetroAOLUIReact95;
