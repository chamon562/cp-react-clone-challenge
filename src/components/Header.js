import React from 'react'
import styled from 'styled-components'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'


// when refresh the user goes back to login
// its saved in the state but the state gets refreshed every single time that we refresh the page 
// need to have something to store the user perhaps a session or local storage
// local storage is storage for my browser for my website this comes directly with the browser and can access it from out website
// can create a local storage item 
// localStorage.setItem('myData', data );
// get the local storage item
// localStorage.getItem('myData');
// remove the local storage
// localStorage.removeItem('myData')
// or to fully clear the local storage
// localStorage.clear();

// highlighting props this is called destructering
// destructer the props and get the user out of this props by passing {user} and take out user from the props
// 
function Header({user, signOut}) {
    // console.log(props)
    // console.log(user)
    return (
        // container is a styled-components so must import it from there
        <Container>
            <Main>
                <AccessTimeIcon />
                <SearchContainer>
                    <Search>
                        <input type="text" placeholder="Search.." />
                    </Search>
                </SearchContainer>
                <HelpOutlineIcon />
            </Main>
            <UserContainer>
                <Name>
                    {user.name}
                </Name>
                <UserImage onClick={signOut}>
                    {/* <img src="https://i.imgur.com/6VBx3io.png" /> */}
                    {/* sometimes if the user.photo doesnt exist check with conditional 
                    if user.photo exist then user.photo else <img src="https://i.imgur.com/6VBx3io.png" />  */}
                    <img src={user.photo ? user.photo : "https://i.imgur.com/6VBx3io.png" } />
                </UserImage>
            </UserContainer>

        </Container>
    )
}

export default Header

const Container = styled.div`
    background: #350d36;
    color: #fff;
    display: flex;
    align-items: center; 
    justify-content: center;
    position: relative;
    box-shadow: 0 1px 0 0 rgb(255 255 255 /10%);
`

const Main = styled.div`
/* display: flex allows us to order a layout */
/* go to flexbox to mess with all different themes */
    display: flex;
    margin-right: 16px;
    margin-left: 16px;

`

const SearchContainer = styled.div`
    min-width: 400px;
    /* the outward spacing is margin */
    margin-left: 16px;
    margin-right: 16px;
`

const Search = styled.div`
    box-shadow: inset 0 0 0 1px rgb(104 74 104);
    width: 100%;
    border-radius: 6px;
    display: flex; 
    align-items: center;
    input{
        background-color: transparent;
        border: none; 
        padding-left: 8px;
        padding-right: 8px;
        padding-top: 4px;
        padding-bottom: 4px;
        color: #fff;
    }
    /* takes outline off the border when clicking on the input */
    input:focus{
        outline: none
    }
`

const UserContainer = styled.div`
    display: flex; 
    align-items: center; 
    padding-right: 16px;
    position: absolute;
    right: 0;
`

const Name = styled.div`
    padding-right: 16px;
`

const UserImage = styled.div`
    /* image is overflowing need to fix */
    width: 28px; 
    height: 28px; 
    border: 2px solid #fff; 
    border-radius: 3px;
    cursor: pointer;
    img{
        /* this changed the image icon to fit inside the bar */
        width: 100%;

    }
`