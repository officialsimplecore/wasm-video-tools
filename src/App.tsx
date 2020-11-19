import React, {ChangeEvent, Dispatch, useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import Navigation from "./Navigation";
import Gif from "./ToGif";

function App() {
  
  return (
      <Router>
          <div className="App">
              <Switch>
                  <Route path="/gif">
                      <Navigation />
                      <Gif/>
                  </Route>
                  <Route path="/compress">
                      <Navigation />
                      <h1>Coming Soon!</h1>
                  </Route>
                  <Route path="/">
                      <Redirect to="/gif"/>
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

export default App;
