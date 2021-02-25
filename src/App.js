import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import styled from 'styled-components'
import Header from './components/Header'
import SideBar from './components/SideBar';
import db from './components/firebase'
import { useEffect, useState } from 'react'
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
  const [ rooms, setRooms] = useState([]) 
  
  
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
      setRooms(snapshot.docs.map((doc) =>{
        // console.log(doc.data()) to check to see if getting data frmo the doc
        // console.log(doc.data())
        // return doc.data(); //gives an array of objects of the rooms 
        // getting the unique id
        return {id: doc.id, name: doc.data().name}
        // need to save the data now and use useState
      }))
    })
  }
  // getChannels() is calling itself over and over so to stop that use useEffect
  // this only calls the function only when initialized
  useEffect(() => {
    // take getChannels and put inside useEffect to be called once initialize
    getChannels();
  }, [])

  console.log(rooms)

  return (
    <div className="App">
      <Router>
        <Container>
          <Header />
          <Main>
            <SideBar rooms={rooms} />



            <Switch>
              <Route path="/room">
                <Chat />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </Main>
        </Container>
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
  grid-template-rows: 38px auto;
`

// main is the container for the sidebar chat
// 
const Main = styled.div`
  display: grid; 
  /* grid-template-columns: width of first width of 2nd column */
  grid-template-columns: 260px auto;
`