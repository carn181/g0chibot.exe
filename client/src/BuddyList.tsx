import React from 'react';
import {
  Window,
  WindowHeader,
  WindowContent,
  MenuList,
  MenuListItem,
} from 'react95';
import { styled } from 'styled-components';

const BuddyListContainer = styled.div`
width: 250px;
overflow-y: auto;
border-right: 2px solid #000;
`;

const BuddyList = ({buddies}) => {
    return (<>
        <BuddyListContainer>
        <Window style={{ margin: '10px' }}>
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
        </>)
}

export default BuddyList;
