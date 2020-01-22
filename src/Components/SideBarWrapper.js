import React, { useContext, useState } from 'react';
import { Menu, Sidebar, Header, Icon, Button, Container, Divider } from 'semantic-ui-react';
import { ShoppingContext } from '../context';
import MenuCard from './MenuCard';

const SidebarWrapper = ({ content }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { visible, setVisible, cartItems, cartTotal } = shoppingContext;
  const [refresh, setRefresh] = useState(false);

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
          <Header inverted textAlign='center'>
            <Icon name='cart' inverted textAlign='center' />CART
          </Header>
          <Header.Subheader content={`${cartTotal.items} ITEMS`} />
          <Divider />
          <Button content="CHECKOUT" color="yellow" floated="right" />
          <Header inverted content={`SUBTOTAL: $${cartTotal.cost}`} />
        </Menu.Item>
        {cartItems.map(val => {
          return (
            <MenuCard value={val} refreshMenu={() => setRefresh(!refresh)} />
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

export default SidebarWrapper;