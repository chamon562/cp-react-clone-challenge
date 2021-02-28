import React from 'react'
import styled from 'styled-components'
import {auth, provider} from  '../firebase'

function Login(props) {
    console.log(props)
    const signIn = () =>{
        // provider gives us a promise that will give us some data later on
        // the promise is that naz is going to give some data in the later date its going to take some time
        // the .then is if he does bring me the data what is it
        //  and the .catch is if he had an error trying to get the data for me
        auth.signInWithPopup(provider)
        // .then is when you accept the promise when given the data
        // in the promise i get the data call the result aka res
        .then((result) =>{
            // when signIn lets create a new user
            const newUser = {
                name: result.user.displayName,
                photo: result.user.photoURL
            }
            // whenever logged in 
            // pass in newUser to the state of the app
            // we will now have that state
            // localStorage accepts JSON string JSON
            // this newUser is an object initialy in javascript convert it to a string using JSON.stringify and itll be saved in localstorage
            // now the newUser is stored in the localStorage but when refreshed still takes back to log in so inside app.js go to useState of user inside the default value of when the app start
            // get the local storage.getItem('user') need to parse it and covert back to an object JSON.parse because getItem('user') is a string
            localStorage.setItem('user', JSON.stringify(newUser))
            props.setUser(newUser)
            console.log(props.setUser(newUser))
            // to see the user
            console.log(result.user)
            // to see the newUser
            console.log(newUser)
            // need to save this new user in the state
            // a state for example say we have a component the state is the app and
            // every single component has its own state its kind of like a database
            // state(data) I can create a one element and another etc and it will remember that data
            // the goal is to be able to add a user to the state so we can remember who the user is
        })
        // .catch is for when did not get data some error happens when promise is broken
        .catch((error) =>{
            alert(error.messgae);
        })
    }

    return (
        <Container>
            <Content>
                <SlackImg src="http://assets.stickpng.com/images/5cb480cd5f1b6d3fbadece79.png" />
                <h1>Sign in Slack</h1>
                <SignInButton onClick={() => signIn()}>
                    Sign in With Google
                </SignInButton>
            </Content>
        </Container>
    )

}

export default Login

const Container = styled.div`
/* container will be the full width  */
    width: 100%;
    /* 100% for height is hard to define depends on parent if its 50px for the height then the 100% will only be 50px */
    height: 100vh;
    background: #f8f8f8;
    display: flex;
    align-items: center;
    justify-content: center;

`

const Content = styled.div`
    /* Content is the white background */
    background-color: white; 
    padding: 100px;
    border-radius: 5px;
    /* display: flex; puts it side by side */
    display: flex;
    /* flex-directino column puts sign in on the bottom of slack image but stretched */
    flex-direction: column;
    justify-content: center;
    /* align-items: center; aligns the item horizontaly for flex-direction: column; */
    align-items: center; 
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);

`

const SlackImg = styled.img`
    height: 100px;
`

const SignInButton = styled.button`
    margin-top: 12px; 
    background-color: #0a8d48;
    color: white; 
    border: none;
    height: 40px; 
    border-radius: 4px; 
    cursor: pointer;

    :hover{
        transition: 0.2s all ease-in-out;
        color: #0F9D58;
        background-color: #ffa500;
    } 
`