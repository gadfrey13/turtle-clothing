import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "../component/pages/homepage/homepage.component";
import ShopPage from "../component/pages/shop/shop.component";
import Header from "../component/header/header.component";
import SignInAndSignUpPage from "../component/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import {connect} from 'react-redux';
import {setCurrentUser} from '../redux/user/user.action';

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

class App extends React.Component {
  

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
       if(userAuth){
         const userRef = await createUserProfileDocument(userAuth);

         userRef.onSnapshot(snapShot => {
           setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
           })
         })
       }

       setCurrentUser(userAuth);//signout currentuser becomes null
    })
  }

  componentWillUnmount(){
    this.unsubscribeFromAuth();//close the subscription
  }

  render() {
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/shop" component={ShopPage} />
          <Route exact path="/SignIn" component={SignInAndSignUpPage} />
        </Switch>
      </div>
    );
  }
}



export default connect(null,mapDispatchToProps)(App);
