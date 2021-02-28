import React from 'react'
import styled from 'styled-components'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { sidebarItemsData } from '../data/SidebarData'
import AddIcon from '@material-ui/icons/Add';
import db from '../firebase'
import { useHistory } from 'react-router-dom'

function SideBar(props) {
    // props stand for property this is how data is passed around
    // console.log(props.rooms[0].name)

    // initialize hisotry 
    const history = useHistory();

    const goToChannel = (id) => {
        if (id) {
            console.log(id);
            // take them to a room
            history.push(`/room/${id}`)
        }
    }
    // adding a Channel update the list call databse because databse has the list
    // this will be called when user pushes the plus sign
    const addChannel = () => {
        // prompt the user for the channel
        const promptName = prompt('Enter Channel name');
        // console.log(promptName)
        if (promptName) {
            // db.collection get the rooms collection .add then an object and the object is going to be {name:
            db.collection('rooms').add({
                // db will generate its own id and the key mad is name: promptName
                name: promptName,
            })
        }
    }

    return (
        <Container>
            <WorkspaceContainer>
                <Name>
                    CleverProgrammer
                </Name>
                <NewMessage>
                    <AddCircleOutlineIcon />
                </NewMessage>
            </WorkspaceContainer>
            <MainChannels>
                {
                    sidebarItemsData.map(item => (
                        <MainChannelItem>
                            {item.icon}
                            {item.text}
                        </MainChannelItem>
                    ))
                }
                <MainChannelItem>
                    <AddCircleOutlineIcon />

                    Add
                </MainChannelItem>
            </MainChannels>
            <ChannelsContainer>
                <NewChannelContainer>
                    <div>
                        Channels
                        </div>
                    <AddIcon onClick={addChannel} />
                </NewChannelContainer>
                <ChannelsList>
                    {/* use jsx functionality */}
                    {/* map through one item to get one room and it will return channel */}
                    {props.rooms.map(item => (
                        <Channel onClick={() => goToChannel(item.id)}>
                            {/* to grab the attribute grab the object. the attribute name */}
                            #{item.name}
                        </Channel>
                    ))}

                </ChannelsList>
            </ChannelsContainer>
        </Container>
    )
}

export default SideBar;

const Container = styled.div`
   background: #3F0E40;
`

const WorkspaceContainer = styled.div`
    color: white;
    height: 64px;
    display: flex;
    align-items: center;
    padding-left: 19px;
    justify-content: space-between;
    border-bottom: 1px solid #532753;
`

const Name = styled.div`

`

const NewMessage = styled.div`
    width: 36px; 
    height: 36px;
    background: white;
    color: #3F0E40;
    fill: #3F0E40;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    margin-right: 20px; 
    cursor: pointer; 
`

const MainChannels = styled.div`

`

const MainChannelItem = styled.div`
    color: rgb(188, 171, 188);
    display: grid;
    grid-template-columns: 15% auto;
    height: 28px; 
    align-items: center;
    padding-left: 19px; 
    cursor: pointer; 

    :hover{
        background: #350D36;
    }

`

const ChannelsContainer = styled.div`
    color: rgb(188, 171, 188);
    margin-top: 10px; 
`

const NewChannelContainer = styled.div`
    display: flex; 
    justify-content: space-between;
    /* vertical align */
    align-items: center;
    height: 28px;
    padding-left: 19px;
    padding-right: 12px; 
`

const ChannelsList = styled.div`

`

const Channel = styled.div`
    display: flex;
    height: 28px;
    align-items: center;
    padding-left: 19px;
    cursor: pointer; 
    :hover{
        background: #350D36;
    }
`

