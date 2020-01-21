import React from 'react';
import { Card, Image, Divider, Header } from 'semantic-ui-react';

const CardItem = ({ product, image }) => {
  return(
    <Card>
      <Image src={image} wrapped ui={false} />
      <Card.Content>
        <Header as="h4">
          {product.title} 
          <Header.Subheader content={product.description ? product.description : "No description"} />
        </Header>
        <Divider />
        <Card.Header content={product.currencyFormat + product.price} />
      </Card.Content>
    </Card>
  );
};

const CardGrid = ({ products }) => {
  return (
    <Card.Group itemsPerRow={4}>
      {products.map(product => 
        <CardItem product={product} image={`/data/products/${product.sku}_1.jpg`} />
      )}
      </Card.Group>
  )
}

export default CardGrid;