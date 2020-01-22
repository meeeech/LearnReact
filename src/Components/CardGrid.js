import React, { useContext } from 'react';
import { Card, Image, Header, Button } from 'semantic-ui-react';
import SizeButtonGroup from './SizeButtonGroup';
import { ShoppingContext } from '../context';

const CardItem = ({ product, image, toggleItem }) => {
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
        <SizeButtonGroup filterGroup={() => console.log("size")} />
      </Card.Content>
      <Card.Content extra>
        <Button 
          size='small'
          fluid 
          content="ADD TO CART" 
          icon='plus' 
          color='yellow' 
          onClick={() => toggleItem(product.sku, '+')}
        />
      </Card.Content>
    </Card>
  );
};

const CardGrid = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { products, toggleItem } = shoppingContext;

  return (
    <Card.Group itemsPerRow={4}>
      {products.map(product => 
        <CardItem product={product} toggleItem={toggleItem} image={`/data/products/${product.sku}_1.jpg`} />
      )}
      </Card.Group>
  )
}

export default CardGrid;