import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Chat from './components/Chat'
import Login from './components/Login'
import styled from 'styled-components'
import Header from './components/Header'
import SideBar from './components/SideBar';

function App() {
  return (
    <div className="App">
      <Router>
        <Container>
          <Header />
          <Main>
            <SideBar />



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