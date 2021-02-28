import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import db from '../firebase'
import firebase from "firebase"
// useParams is a function that comes with react-router-dom which will look at the id in the url
// and because in App.js <Router path="/room/:channelId" > it will directily map the id string to the channelId variable
function Chat({ user }) {
    // the id is in the url
    // this comes from react-router-dom useParams
    // now we can get the parameter of the ChannelId because we mapped it correclty
    let { channelId } = useParams();

    // using snapshot.data by using useState
    // save the data inside the state
    // and now the Chat.js component will have the channel state here that we set inside the getChannel function
    const [channel, setChannel] = useState();
    const [messages, setMessages] = useState([]);
    console.log(messages)

    const getMessages = () => {
        db.collection('rooms')
            // select individual room with .doc(channelId)
            .doc(channelId)
            // getting the collction within the main room collection
            .collection('messages')
            // order by time stamp ascending the last one to be the newest one
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => {
                // here is we save the messages
                // how do we save the data in the component by putting it into the state
                // snapshot.docs.map() is going to loop through each message
                // and return to us doc.data()
                let messages = snapshot.docs.map((doc) => doc.data());
                // will do setMessages and pass it into the state
                // console.log(messages)
                setMessages(messages);
                // get messages will be called whenever we click on the channel to get the messages from them
            })
    }
    // will take an input as text
    const sendMessage = (text) => {
        // will add this to db.collection
        if (channelId) {
            // if channelId exist then add the text
            // create a payload rockets have payload
            // the payload is the data from the text message
            // let payload equal an object and it will have a few things
            let payload = {
                // and will pass in the text from the sendMessage function
                // this text is from the text up there passed in sendMessage
                text: text,
                // using firebase to get the timestamp by importing firebase from '../firebase'
                // timestamp that comes directly from firebase
                timestamp: firebase.firestore.Timestamp.now(),
                // in order to get user have to go back to App.js and make sure the user state is passed in Chat component <Chat /> so it has access to it
                // checked the Login.js of newUser to see the attributes correctlu for user
                user: user.name,
                userImage: user.photo,
            }
            console.log(payload)
            // how do we save this payload to the database
            // save to the collection db.collection('rooms') pass in the channel db.collection('rooms').doc(channelId) of .collection of messages 
            // db.collection('rooms').doc(channelId).collection('messages') then adding the payload with .add
            // db.collection('rooms').doc(channelId).collection('messages').add(payload)
            // getting the rooms with db.collection('rooms')
            // getting the current channel with .doc(channelId)
            // then getting the messages .collection('messages') from the current channel .doc(channelId)
            // then adding a new text a new message to that payload with .add(payload)
            db.collection('rooms').doc(channelId).collection('messages').add(payload);
        }
    }

    // console.log(channel)
    const getChannel = () => {
        // a picture of the current channelId and get the data
        db.collection('rooms')
            .doc(channelId)
            .onSnapshot((snapshot) => {
                // console.log(snapshot)
                // set the channel data
                console.log(snapshot.data())
                // set the Channel to snapshot.data().name
                setChannel(snapshot.data())
            })
    }
    // change the channelId with useEffect
    useEffect(() => {
        // this will now listen for changes in [channelId] of the params 
        // whenever the params of the channelId changes
        // it will fire whatever is in the useEffect so throw in getChannel function
        getChannel();
        getMessages();
    }, [channelId])

    return (
        <Container>
            <Header>
                <Channel>
                    <ChannelName>
                        {/* bug when having only channel.name and refreshing it would error saying name of undefined
                        so added channel && channel.name
                        this is calle risk condition sometimes the channel doesnt exsist yet because it loads later on
                        */}
                        # {channel && channel.name}
                    </ChannelName>
                    <ChannelInfo>
                        Companty-wide announcements and work-based matters
                    </ChannelInfo>
                </Channel>
                <ChannelDetails>
                    <div>
                        Details
                    </div>
                    <Info />
                </ChannelDetails>
            </Header>
            <MessageContainer>
                {/* creating a function  */}
                {
                    // if the length of the message is greater than 0 
                    // and then will loop through them and then show them through <Chat/>Message
                    // this is where we now use <ChatMessage /> when we loop through the data
                    // fixed error that wasnt properly passing data to Chatmessage Component because the messages.map(data, index) =>{} was using an object 
                    // when it should be messages.map((data, index) =>()) parenthesis
                    messages.length > 0 &&
                    messages.map((data, index) => (

                        // console.log(index);
                        <ChatMessage
                            text={data.text}
                            name={data.user}
                            image={data.userImage}
                            timestamp={data.timestamp}
                        />
                    ))
                }
            </MessageContainer>
            {/* pass in sendMessage into the ChatInput Component and go into Chatinput.js to accept function */}
            <ChatInput sendMessage={sendMessage} />
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display:grid;
    /* to define 3 rows use grid-template rows and rows are horizontal */
    /* grid-template-rows: first second and third row */
    /* height 64px and auto is when the message gets bigger it will expand auto and third is min-content means this third row will take in as mininmal as the row */
    /* because of the auto its causing it to stretch so will put in a min-height of zero to keep the box of the chat stabled on screen */
    grid-template-rows: 64px auto min-content;
      /* fix with the whole thing scrolling with minmax(0, 1fr) in App.js Container*/

    min-height: 0;

`

const Header = styled.div`
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(83, 39, 83, .13);
    justify-content: space-between;

`

const MessageContainer = styled.div`
      /* fix with the whole thing scrolling with minmax(0, 1fr) in App.js Container*/

    display: flex; 
    flex-direction: column;
    overflow-y: scroll;
`

const Channel = styled.div`

`

const ChannelDetails = styled.div`
    display: flex;
    align-items: center;
    color: #606060;
`

const ChannelName = styled.div`
    font-weight: 700;
`

const ChannelInfo = styled.div`
    font-weight: 400;
    color: #606060;
    font-size: 13px;
    margin-top: 8px;
`

const Info = styled(InfoOutlinedIcon)`
    margin-left: 10px; 
`