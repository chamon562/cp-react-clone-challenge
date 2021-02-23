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

`

const Search = styled.div`

`

const UserContainer = styled.div`
    display: flex; 
    align-items: center; 
`

const Name = styled.div`

`

const UserImage = styled.div`
    
`