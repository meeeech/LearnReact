import React, { useContext, useState, useEffect } from 'react';
import CardGrid from './Components/CardGrid';
import SidebarWrapper from './Components/SideBarWrapper';
import { ShoppingContext } from './context';
import { Grid, Button, Label, Header } from 'semantic-ui-react';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const App = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { setVisible, cartTotal } = shoppingContext;

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  const Content = () => {
    return(
      <Grid padded='vertically'>
        <Grid.Row>
          <Grid.Column width={15}>
            <Banner user={user} />
          </Grid.Column>
          <Grid.Column width={1}>
            <Button 
              color='yellow'
              label={<Label content={cartTotal.items} />}
              icon="cart" 
              onClick={() => setVisible(true)} 
            />
          </Grid.Column>
        </Grid.Row> 
        <Grid.Row>
         <CardGrid />
        </Grid.Row>
      </Grid>
    );
  };

  return (
    <SidebarWrapper content={<Content />} /> 
  );
};

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const Banner = ({ user }) => (
  !user ? <SignIn /> :
  <Header>
    {!user ? 'Welcome,  Shopper' : `Welcome, ${user.displayName}`}
    <Button 
      style={{ marginLeft: "15px" }} 
      compact
      color="yellow"
      content="Log Out" 
      onClick={() => firebase.auth().signOut()} 
    />
  </Header>
);


export default App;