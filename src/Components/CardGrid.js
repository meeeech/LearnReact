import React, { useContext } from 'react';
import { Card, Image, Divider, Header } from 'semantic-ui-react';
import SizeButtonGroup from './SizeButtonGroup';
import { ShoppingContext } from '../context';

const CardItem = ({ product, image, toggleItem }) => {
  return(
    <Card onClick={() => toggleItem(product.sku, '+')}>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Header as="h4">
          {product.title} 
          <Header.Subheader content={product.description ? product.description : "No description"} />
        </Header>
        <Divider />
        <Card.Header content={product.currencyFormat + product.price} />
      </Card.Content>
      <Card.Content extra> 
        <SizeButtonGroup filterGroup={() => console.log("size")} />
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