import React, { useContext, useState } from 'react';
import { Card, Image, Header, Button } from 'semantic-ui-react';
import { ShoppingContext } from '../context';

const CardItem = ({ product, image }) => {
  const shoppingContext = useContext(ShoppingContext);
  const { inventory, toggleItem } = shoppingContext;

  const [size, setSize] = useState(null);

  return(
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Header as="h4">
          {product.title} 
          <Header.Subheader content={product.description ? product.description : "No description"} />
        </Header>
        <Card.Header content={product.currencyFormat + product.price} />
      </Card.Content>
      <Card.Content extra> 
        <div>
          {["S", "M", "L", "XL"].map(s => 
            <Button 
              active={s === size}
              content={s} 
              basic
              size="tiny" 
              disabled={inventory[product.sku] ? inventory[product.sku][s] === 0 : false}
              onClick={() => setSize(s)}
            />
          )}
        </div>
      </Card.Content>
      <Card.Content extra>
        <Button 
          size='small'
          fluid 
          content="ADD TO CART" 
          icon='plus' 
          color='yellow' 
          disabled={size===null}
          onClick={() => toggleItem(product.sku, '+', size)}
        />
      </Card.Content>
    </Card>
  );
};

const CardGrid = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { products } = shoppingContext;

  return (
    <Card.Group itemsPerRow={4}>
      {products.map(product => 
        <CardItem 
          product={product} 
          image={`/data/products/${product.sku}_1.jpg`} 
        />
      )}
      </Card.Group>
  )
}

export default CardGrid;