import React from 'react'
import styled from 'styled-components'

function ChatMessage() {
    return (
        <Container>
            <UserAvatar>
                <img src="https://randomuser.me/api/portraits/women/25.jpg" />
            </UserAvatar>
            <MessageContent>
                <Name>
                    Channee Math
                    <span>
                        2/25/20201 11:34am
                    </span>
                </Name>
                <Text>
                    Best Challenge ever
                </Text>
            </MessageContent>
        </Container>
    )
}

export default ChatMessage

const Container = styled.div`
/* padding: vertical horzitonal */
    padding: 8px 20px;
    display: flex; 
    align-items: center; 
`

const UserAvatar = styled.div`
    width: 36px;
    height: 36px;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 8px;

    img{
        width: 100%;
    }
`

const MessageContent = styled.div`
    display: flex; 
    /* flex-direction to change the direction of the flow */
    flex-direction: column;
`

const Name = styled.span`
    font-weight: 900;
    font-size: 15px;
    line-height: 1.4;
    span {
        margin-right: 8px; 
        font-weight: 400;
        color: rgba(97, 97, 97);
        font-size: 13px;
    }
`

const Text = styled.span`

`