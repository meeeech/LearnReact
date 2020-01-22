import React, { useContext, useState } from 'react';
import { Menu, Sidebar, Header, Icon, Button, Container } from 'semantic-ui-react';
import { ShoppingContext } from '../context';
import MenuCard from './MenuCard';

const SidebarWrapper = ({ content }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { visible, setVisible, cartItems } = shoppingContext;
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
          <Header textAlign='center' inverted><Icon name='cart' inverted/>CART</Header>
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