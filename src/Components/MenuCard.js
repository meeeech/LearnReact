import React, { useContext, useState } from 'react';
import { Segment, Header, Image, Divider, Button } from 'semantic-ui-react';
import { ShoppingContext } from '../context';

const MenuCard = ({ value, refreshMenu }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { toggleItem, inventory } = shoppingContext;
  const [refresh, setRefresh] = useState(false);

  return(
    <React.Fragment>
      <Segment inverted basic fluid='true'>
        <Image size='tiny' src={`/data/products/${value.product.sku}_1.jpg`} floated='left' />
        <Button 
          icon='close' 
          onClick={() => { 
            toggleItem(value.product.sku, 'x', value.size); 
            refreshMenu(); 
          }} 
          floated='right'
          size='tiny'
        />
        <Header as="h4" inverted>
          {value.product.title}
          <Header.Subheader content={`${value.product.description} | ${value.size}`} />
          <Header.Subheader content={`Quantity: ${value.quantity}`} />
        </Header>
        <Button.Group floated='right'>
          <Button 
            size='tiny' 
            icon='minus' 
            attached='left' 
            disabled={value.quantity===1}
            onClick={() => { 
              toggleItem(value.product.sku, '-', value.size); 
              setRefresh(!refresh);
            }}
          />
          <Button 
            size='tiny' 
            icon='plus' 
            attached='right' 
            disabled={inventory[value.product.sku][value.size] === 0}
            onClick={() => { 
              toggleItem(value.product.sku, '+', value.size); 
              setRefresh(!refresh);
            }}
          />
        </Button.Group>
        <Header 
          color="yellow"
          content={`${value.product.currencyFormat}${value.product.price * value.quantity}`} 
        />
      </Segment>
      <Divider inverted/>
    </React.Fragment>
  );
};


export default MenuCard;