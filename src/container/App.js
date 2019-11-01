import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "../component/pages/homepage/homepage.component";
import ShopPage from "../component/pages/shop/shop.component";
import Header from "../component/header/header.component";
import SignInAndSignUpPage from "../component/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth } from "../firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      this.setState({currentUser: user});
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();//close the subscription
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/SignIn" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
