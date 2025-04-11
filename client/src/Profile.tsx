import {
  Button,
  Window,
  WindowHeader,
  WindowContent,
  TextInput,
  MenuListItem,
} from 'react95';
import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import { styled } from 'styled-components';
/* Pick a theme of your choice */

/* Original Windows95 font (optional) */
import axios from 'axios';
import gamergochiImg from './assets/gamergochi.png'
import animegochiImg from './assets/animegochi.png'
import emogochiImg from './assets/emogochi.png'




// Styled-components for layout
const ChatWindowContainer = styled.div`
flex: 1;
padding: 10px;
display: flex;
flex-direction: column;
height: 30em;
`;
const TomogachiButtons = styled.div`
width: 30em;
flex: 1;
padding: 10px;
display: flex;
flex-direction: column;
flex-grow: true;
`;

const ProfileImageDiv = styled.div`
width: 100%;
flex: 1;
flex-direction: row;
background-color: white;
`

const ProfileImage = styled.img`
margin-left: auto;
margin-right: auto;
height: 20em;

`

const Profile = ({ botType}: { botType: string}) => {
  const nodeRef = useRef(null);
  let img;
  console.log(botType);
  switch (botType) {
         case 'emogochi':
             img = emogochiImg;
             break;
         case 'gamergochi':
             img = gamergochiImg;
             break;
         case 'animegochi':
             img = animegochiImg;
             break;
         default:
             img = animegochiImg
             break;
  }
  const [boredom, setBoredom] = useState(0);
  const [hunger, setHunger] = useState(0);
  const [mood, setMood] = useState(0);
    const [tiredness, setTiredness] = useState(0);
  async function getInfo() { 
    const url = "http://localhost:5000"
    const currNum = 1
        try {
            const resp = await axios.get(url + "/chatbot/" + currNum + "/information")
            console.log(resp.data.history);
            if (resp.data.history != null) {
                let msgs = []
                resp.data.history.map((o) => {
                    msgs.push({ "type": "sent", text: o.user });
                    msgs.push({ "type": "received", text: o.bot })
                })
                console.log(JSON.stringify(msgs));
            }
            if (resp.data.available_types != null) { console.log(resp.data.history) };
        } catch (err) {
            console.log(err);
        }
        return Promise.resolve([]);
  }

  useEffect(
    () => {
      getInfo()
    }, []
  )
  return (
    <>
      <Draggable nodeRef={nodeRef}>
        <ChatWindowContainer ref={nodeRef}>
          <Window style={{ flex: 1, marginBottom: '10px'}}>
            <WindowHeader>Tomogachi Actions: {botType}</WindowHeader>
            <ChatWindowContainer>
            <ProfileImageDiv>
              <ProfileImage src={img} />
              <MenuListItem>Hunger: {hunger}</MenuListItem>
              <MenuListItem>Boredom: {boredom}</MenuListItem>
              <MenuListItem>Mood: {mood}</MenuListItem>
              <MenuListItem>Tiredness: {tiredness}</MenuListItem>                                          
            </ProfileImageDiv>              
              <TomogachiButtons>
                <Button> Feed</Button>
                <Button> Sleep</Button> 
                <Button> Play</Button>                               
              </TomogachiButtons>
              </ChatWindowContainer>
          </Window>

          {/* Message Input */}

        </ChatWindowContainer>
      </Draggable>
    </>
  )
}

export default Profile;
