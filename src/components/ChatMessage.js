import React from 'react'
import styled from 'styled-components'

function ChatMessage({ text, name, image, timestamp }) {
    console.log(text)
    return (
        <Container>
            <UserAvatar>
                <img src={image} />
            </UserAvatar>
            <MessageContent>
                <Name>
                    {name}
                    <span>
                        {/* timestamp was giving an 
                        Error: Objects are not valid as a React child (found: object with keys 
                        {seconds, nanoseconds}). If you meant to render a collection of children, use an array instead. 
                        and this error was highlighting the setMessage state in Chat.js when the issue is here 
                        so this new Date(timestamp.toDate() made it into an object and needed to convert to a string using .toUTCString()
                        {new Date(timestamp.toDate()).toTUCString()}*/}
                        {new Date(timestamp.toDate()).toUTCString()}
                        {/* {new Date(timestamp.toDate())} */}
                    </span>
                </Name>
                <Text>
                    {text}
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