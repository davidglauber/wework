// import dependencies
import React, {Component} from 'react';


//import firebase
import firebase from '../../config/firebase';


export default class CheckUserScreen extends Component {
  constructor(props) {
    super(props);
  }


   async componentDidMount() {
      await firebase.auth().onAuthStateChanged((user) => {
          if(user) {
            this.props.navigation.navigate('HomeNavigatorC')
          } else {
            this.props.navigation.navigate('Onboarding')
          }
      })
  }



  render() {
    return (
        <>
        </>
    );
  }
}
