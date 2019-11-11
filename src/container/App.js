import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import {createStructuredSelector} from 'reselect';
import "./App.css";
import HomePage from "../component/pages/homepage/homepage.component";
import ShopPage from "../component/pages/shop/shop.component";
import Header from "../component/header/header.component";
import SignInAndSignUpPage from "../component/pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import CheckOutPage from '../component/pages/checkout/checkout.component';

import { auth, createUserProfileDocument } from "../firebase/firebase.utils";
import {connect} from 'react-redux';
import {setCurrentUser} from '../redux/user/user.action';
import {selectCurrentUser} from '../redux/user/user.selector';//pass in the highest order state to the function

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

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
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/signin" render={() => this.props.currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
          <Route exact path="/checkout" component={CheckOutPage} />
        </Switch>
      </div>
    );
  }
}



export default connect(mapStateToProps,mapDispatchToProps)(App);
