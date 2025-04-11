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
import { useRef } from 'react';

const BuddyListContainer = styled.div`
width: 250px;
overflow-y: auto;

`;

const BuddyList = ({buddies}) => {
  const nodeRef = useRef(null);
  return (<>
      <Draggable nodeRef={nodeRef}>
          <BuddyListContainer ref={nodeRef}>
                <Window style={{ margin: '0px' }}>
                  <WindowHeader>g0chib0t.exe</WindowHeader>
                  <WindowContent>
                    <MenuList>
                      {buddies.map((buddy, index) => (
                        <MenuListItem key={index}>{buddy}</MenuListItem>
                      ))}
                    </MenuList>
                  </WindowContent>
                </Window>
        </BuddyListContainer>
      </Draggable>
          </>)
}

export default BuddyList;
