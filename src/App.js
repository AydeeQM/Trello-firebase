import React from 'react';
import './App.css';
import SignUp from './Signup';
import SignIn from './Signin';
import Boards from './Boards';
import TrelloApp from './Detailsboard';
import { connect } from "redux-zero/react";
import { HashRouter, Switch, Route } from 'react-router-dom';

const App = ({ boards, selectedBoard, successLogin, user, tboard, showReply }) => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <SignIn successLogin={successLogin} />} />
        <Route path="/signin" render={() => <SignIn successLogin={successLogin} />} />
        <Route path="/signup" render={() => <SignUp successLogin={successLogin} />} />
        <Route path="/boards" render={() => <Boards successLogin={successLogin} user={user} tboard={tboard} showReply={showReply} />} />
        <Route path="/details" render={() => <TrelloApp user={user} selectedBoard={selectedBoard} successLogin={successLogin} />} />
        <Route render={() => !successLogin ? <SignIn successLogin={successLogin} /> : <Boards successLogin={successLogin} user={user} tboard={tboard} showReply={showReply} />} />
      </Switch>
    </HashRouter>
  );
}

const mapToProps = ({ boards, selectedBoard, successLogin, user, tboard, showReply }) => ({ boards, selectedBoard, successLogin, user, tboard, showReply });
export default connect(mapToProps)(App);
