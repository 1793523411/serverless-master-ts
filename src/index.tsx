import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Login from './components/Login'
import AdminIndex from './components/AdminIndex'

export default function App() {

  return (
    <Router>
      <div>
        <Route path="/" exact component={Login} />
        <Route path="/index/" component={AdminIndex} />
      </div>


    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);