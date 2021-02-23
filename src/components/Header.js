import React from 'react'
import styled from 'styled-components'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline'
function Header() {
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
                    Channee
                </Name>
                <UserImage>
                    <img src="https://i.imgur.com/6VBx3io.png" />
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
    justify-content: space-between;
`

const Main = styled.div`
/* display: flex allows us to order a layout */
/* go to flexbox to mess with all different themes */
    display: flex;

`

const SearchContainer = styled.div`
    min-width: 400px;
`

const Search = styled.div`
    width: 100%;
    box-shadow: inset 0 0 0 1px rgb(104 74 104);
    border-radius: 6px;
    input{
        background-color: transparent;
        border: none; 
        padding-left: 8px;
        padding-right: 8px;
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
`

const Name = styled.div`

`

const UserImage = styled.div`
    
`