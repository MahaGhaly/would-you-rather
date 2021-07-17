import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Nav from './Nav'
import HomePage from './HomePage'
import QuestionCard from './QuestionCard'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import Login from './Login'
import NotFound from './NotFound'


class App extends Component {
  state={
    logedIn: false
  }

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  handleLogin=()=>{
    this.setState(()=>({logedIn:true}))
  }
  handleLogout=()=>{
    this.setState(()=>({logedIn:false}))
  }

  
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />

            {(this.state.logedIn===true) ? (
          <div>
            <Nav logout={this.handleLogout} />
            <hr />
            
              <Switch>
                  <Route exact path="/" component={HomePage} />
                  <Route path="/add" component={NewQuestion} />
                  <Route path="/leaderboard" component={Leaderboard} />
                  <Route path="/questions/:id" component={QuestionCard} />
                  <Route path="/404-page" component={NotFound}/>
              </Switch>
          </div>
              ):(
                <div>
                  <Login login={this.handleLogin}/>
                </div>
                )}
        </Fragment>
      </Router>
    )
  }
}


export default connect()(App)