import React from 'react';
import {
  Window,
  WindowHeader,
  WindowContent,
  MenuList,
  MenuListItem,
} from 'react95';
import { styled } from 'styled-components';
import Draggable from 'react-draggable';
import { useRef, useState } from 'react';
import axios from 'axios';

const BuddyListContainer = styled.div`
width: 250px;
overflow-y: auto;

`;

const BuddyList = ({buddies, updateCurrBot}) => {
  const nodeRef = useRef(null);
  const url = "http://localhost:5000"

  
  let [buddiesList, setBuddiesList ]= useState(null);

  React.useEffect(() => {
    async function getBotTypes(): Promise<any>{
      try {
        const resp = await axios.get(url + "/chatbot/all")
        setBuddiesList(resp.data.available_types)
        if (resp.data.available_types != null) { updateCurrBot(resp.data.available_types[0]) };
      } catch (err) {
          console.log(err);
      }
      return Promise.resolve([]);
    }
    getBotTypes();
    console.log(buddiesList)
  }, [])
  
  return (<>
      <Draggable nodeRef={nodeRef}>
          <BuddyListContainer ref={nodeRef}>
                <Window style={{ margin: '0px' }}>
                  <WindowHeader>g0chib0t.exe</WindowHeader>
                  <WindowContent>
                    <MenuList>
                      {buddiesList != null ? buddiesList.map((buddy, index) => (
                        <MenuListItem key={index} onClick={(e) => { updateCurrBot(e.target.textContent) }}>{buddy}</MenuListItem>
                      )) : null}
                    </MenuList>
                  </WindowContent>
                </Window>
        </BuddyListContainer>
      </Draggable>
          </>)
}

export default BuddyList;
