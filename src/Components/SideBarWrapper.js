import React, { useContext, useState } from 'react';
import { Menu, Card, Sidebar, Header, Icon } from 'semantic-ui-react';
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
        onHide={() => setVisible(false)}
        inverted
        vertical
        visible={visible}
        direction='right'
        width='very wide'
      >
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
        {content}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SidebarWrapper;