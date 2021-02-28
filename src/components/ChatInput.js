import React, { useState } from 'react'
import styled from 'styled-components'
import SendIcon from '@material-ui/icons/Send';

function ChatInput({ sendMessage }) {
    // creating a state called input and allows us to keep track of what were currently typing and set to empty string
    const [input, setInput] = useState("");
    // this function will be called by the button itself
    // this event will actually refresh the page and dont want that so e.preventDefault
    const send = (e) => {
        // e.preventDefautl to prevent the page from refreshing
        e.preventDefault();
        // call the sendMessage that we got from the Chat.js
        // what text do we pass in this is where we have to keep track in our input
        // and whenever we type do onChange inside the input
        // if input doesnt exist or the text is nothing return stop fully
        if (!input) return;
        sendMessage(input)
    }
    return (
        <Container>
            <InputContainer>
                <form>
                    <input
                        // pass in e and will set the input here because
                        // on the change the input itself has an e value called an event and the event contains something calle e.target.value
                        // so will change this input onChange every time we type being shown by setInput(e.target.value)
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        placeholder="message here..."
                    />
                    {/* As clicking submit it as click send it will call the send function
                    the send function will e.preventDefault so it doesnt refresh and it will call the 
                    sendMessage function with the input provided then the send message function will go back up to the sendMessage you passed in to ChatInput({sendMessage}) 
                    will go back to the Chat.js because sendMessage was passed in <ChatInput sendMessage={sendMessage} inside the Chat.js
                    it will then be called inside the sendMessage function from Chat.js if(channeId){ let payload = {text: text, timestamp: firebase.firestore.Timestamp.now(), user: user.name, userImage: user.photo}}
                    and its saved in the db.collection('rooms').doc(channelId).collection('message').add(payload)
                    */}
                    <SendButton
                        type="submit"
                        onClick={send}
                    >
                        {/* the button itself passes in an event so pass in e or event inside the send function */}
                        {/* the submit button is what allows us to hit the enter
                        // when you make a type of submit button it will also call it when you hit enter thats the difference */}
                        <Send />
                    </SendButton>
                </form>
            </InputContainer>
        </Container>
    )
}

export default ChatInput;

const Container = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 24px;
`

const InputContainer = styled.div`
    border: 1px solid #8D8D8E;
    border-radius: 4px;

    /* target form */
    form {
        display: flex;
        height: 42px;
        align-items: center;
        padding-left: 10px;
        input{
            flex: 1;
            border: none;
            font-size: 13px;
        }
        input:focus{
            outline: none;
        }
    }
`
// the sendButton is a container div itself
const SendButton = styled.button`
    background: #007a5a;
    border-radius: 2px;
    width: 32px;
    height: 32px;
    /* once its flex can align and justify-content */
    display: flex;
    align-items: center;
    justify-content: center; 
    margin-right: 5px;
    border: none;
    cursor: pointer; 

    .MuiSvgIcon-root{
        width: 18px;
    }

    :hover{
        background: #148567;
    }
`

const Send = styled(SendIcon)`
    color: #D9D9D9;
`