import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import styled from 'styled-components'
import Header from './components/Header'
import SideBar from './components/SideBar';
import db from './firebase'
import { useEffect, useState } from 'react'
// since we used auth to sign in will use auth to sign out
import { auth, provider } from './firebase'

function App() {
  // useState has the value itself  and the function to change it
  // in useState pass in the array 
  // useState is like creating a new database 
  // and its creating it just for App component
  // the data for this section is the rooms and the setRooms is function that changes the data in the section
  // since have rooms here, it can be passed down to multiple components
  // taking rooms and passing it into the Sidebar.js by going to <Sidebar rooms={rooms} />
  // now the data is passed from App.js to Sidebar.js, and once in Sidebar.js make sure to pass in props to the component.
  // inside Sidebar.js function Sidebar(props){...}
  const [rooms, setRooms] = useState([]);

  // only if logged in if the user is there
  // create state for user this will be where user gets stored
  // user is currently in the app state setUser function is what actually sets the user
  // can use this user to put the name and photo in the header
  // so pass in user to the Header component so it gets the user as a prop
  // getting localStorage.JSON.parse.getItem('user')
  // get the local storage.getItem('user') need to parse it and covert back to an object JSON.parse(localStorage.getItem('user')) because getItem('user') is a string
  // convert from string to an object JSON.parse
  // now when restarting the app it doesnt set back to log in.
  // the state might be gone but local storage is still there
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  // now can use this user object anywhere needed
  console.log("user in App state", user);
  // pass in the setUser function into the Login component down below
  // create a getchannels function
  // Also known as ***** WEB HOOK **** 
  // Every time firebase gets updated it hits the snapshot function to run again
  const getChannels = () => {
    // how do i grab the channels 
    // exported db from the firebase.js
    // to get a database collection from firebase
    // db.collections('the name of the databse collection created was room')
    // onSnapShot is like taking a picture of the datbase. contains the data inside the collection
    db.collection('rooms').onSnapshot((snapshot) => {
      // console.log(snapshot.docs) 
      // snapshot data snapshot.docs.map() loop through doc
      setRooms(snapshot.docs.map((doc) => {
        // console.log(doc.data()) to check to see if getting data frmo the doc
        // console.log(doc.data())
        // return doc.data(); //gives an array of objects of the rooms 
        // getting the unique id
        return { id: doc.id, name: doc.data().name }
        // need to save the data now and use useState
      }))
    })
  }

  const signOut = () => {
    auth.signOut()
      .then(() => {
        // will do 2 things setUser(null)
        // delete it from localstorage
        // remove user from local storage and from the state as well
        localStorage.removeItem('user');
        // setUser(null) because dont want it in our local storage anymore
        // setUser() will only change in the state
        setUser(null);
      })
      .catch(error => {
        alert(error)
      })

  }  // getChannels() is calling itself over and over so to stop that use useEffect
  // this only calls the function only when initialized
  useEffect(() => {
    // take getChannels and put inside useEffect to be called once initialize
    getChannels();
  }, [])

  // console.log(rooms)

  return (
    <div className="App">
      {/* check if user exist */}
      <Router>
        {/* turnerary if there is no user show Login else show all the content created */}
        {
          !user ? <Login setUser={setUser} />
            :
            <Container>
              <Header signOut={signOut} user={user} />
              <Main>
                <SideBar rooms={rooms} />
                <Switch>
                  <Route path="/room/:channelId">
                    <Chat user={user}/>
                  </Route>
                  {/* last channel always has to be the root because as its going through other  */}
                  <Route path="/">
                    Select or Create channel
                    {/* once setUser has been passed to Login Component go to Login and pass in props to get it */}
                    {/* <Login/> */}
                  </Route>
                </Switch>
              </Main>
            </Container>
        }
      </Router>
    </div>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  /* 100vh is vertical height */
  height: 100vh;
  /* grid will find the height made header and chat have their own box */
  display: grid;
  /* grid-template-rows: height height */
  /* auto fills out the rest of it */
  /* fix with the whole thing scrolling with minmax(0, 1fr) */
  /* 1fr is 1 free space the min is zero the max is 1 free space auto makes it fill up to how much the content fills up the free space is is only going to take up the space on screen */
  grid-template-rows: 38px minmax(0, 1fr);
`

// main is the container for the sidebar chat
// 
const Main = styled.div`
  display: grid; 
  /* grid-template-columns: width of first width of 2nd column */
  grid-template-columns: 260px auto;
`