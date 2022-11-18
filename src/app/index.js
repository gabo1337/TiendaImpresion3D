import React from "react";
import  {render}  from "react-dom";

import App from './app';
import User from './userDetails';

render(<App/>, document.getElementById('app'));
render(<User/>, document.getElementById('User'));
