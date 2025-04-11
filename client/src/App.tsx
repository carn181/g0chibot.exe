import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Button,
  styleReset,
} from 'react95';
import { createGlobalStyle, ThemeProvider, styled } from 'styled-components';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
/* Pick a theme of your choice */
import original from 'react95/dist/themes/original';

/* Original Windows95 font (optional) */
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';

import BuddyList from './BuddyList'
import ChatWindow from './ChatWindow'
import Profile from './Profile'

import axios from "axios"

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
`;


const App = () => {
  const [currBot, setCurrBot] = useState("")
  const [displayChat, setDisplayChat] = useState(false )
  const [displayProfile, setDisplayProfile] = useState(false)
  const [currNum, setCurrNum] = useState(1)
  const [chatstarted, setchatstarted] = useState(false);
  function openBot () {
    setDisplayChat(true)
    setDisplayProfile(true)
    setchatstarted(false);
  }
  return (
    <StyleSheetManager shouldForwardProp={shouldForwardProp}>
      <div>
        <GlobalStyles />
        <ThemeProvider theme={original}>
          <AppLayout>
            {/* Header Bar */}
            <AppBar>
              <Toolbar>
                <Button variant="menu">Start</Button>
                           
              </Toolbar>
            </AppBar>

            <ContentLayout>
              {/* Buddy List */}
              <BuddyList buddies={[]} updateCurrBot={setCurrBot} setOpenBot={openBot} setCurrNum={setCurrNum} />
              {/* Chat Window */}
              { displayChat ? 
                              <ChatWindow key={currBot} botType={currBot} currNum={currNum} prevMessages={[]} chatstarted={chatstarted} setChatStarted={setchatstarted} />
                : null
              }
              {/*Profile Window*/}
              { displayProfile ?
                <Profile botType={currBot} />
                : null}
                      
                    </ContentLayout>

                  
                </AppLayout>
            </ThemeProvider>
        </div>
    </StyleSheetManager>
    )
};

export default App;

