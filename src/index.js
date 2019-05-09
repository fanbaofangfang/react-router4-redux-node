import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { Route, BrowserRouter, Redirect, Switch } from "react-router-dom";
import Login from "./container/login/login";
import Register from "./container/register/register";
import AuthRouter from "./container/authRouter/authRouter";
import BossInfo from "./container/bossinfo/BossInfo";
import GeniusInfo from "./container/geniusinfo/geniusInfo";
import Dashboard from "./component/dashboard/Dashboard";
import Chat from  "./component/chat/Chat";
import reducers from "./reducers";
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRouter />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/bossinfo" component={BossInfo} />
          <Route path="/geniusinfo" component={GeniusInfo} />
          <Route path="/chat/:user" component={Chat} />
          <Route component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
