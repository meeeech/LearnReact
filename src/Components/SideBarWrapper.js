import React, { useContext, useState, useEffect } from 'react';
import { Menu, Sidebar, Header, Icon, Button, Container, Divider } from 'semantic-ui-react';
import { ShoppingContext } from '../context';
import MenuCard from './MenuCard';
import firebase from 'firebase/app';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const SidebarWrapper = ({ content }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { visible, setVisible, cartItems, cartTotal } = shoppingContext;
  const [refresh, setRefresh] = useState(false);

  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation='overlay'
        inverted
        vertical
        visible={visible}
        direction='right'
        width='very wide'
      >
        <Button inverted icon='close' onClick={() => setVisible(false)} />
        <Menu.Item>
          <Banner user={user}/>
          <Divider inverted />
          <Header inverted textAlign='center'>
            <Icon name='cart' inverted />CART
          </Header>
          <Header.Subheader content={`${cartTotal.items} ITEMS`} />
          <Divider />
          <Button content="CHECKOUT" color="yellow" floated="right" />
          <Header inverted content={`SUBTOTAL: $${cartTotal.cost}`} />
        </Menu.Item>
        {cartItems.map(val => {
          return (
            <MenuCard key={val.sizeSku} value={val} refreshMenu={() => setRefresh(!refresh)} />
          );
        })}
      </Sidebar>
      <Sidebar.Pusher dimmed={visible}> 
        <Container>
          {content}
        </Container>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
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
  <Header inverted>
    {!user ? 'Welcome,  Shopper' : `Welcome, ${user.displayName}`}
    <Button 
      floated='right'
      compact
      color="yellow"
      content="Log Out" 
      onClick={() => firebase.auth().signOut()} 
    />
  </Header>
);

export default SidebarWrapper;