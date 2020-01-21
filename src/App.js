import React, { useEffect, useState } from 'react';
import CardGrid from './Components/CardGrid';
import { Grid } from 'semantic-ui-react';
import SizeButtonGroup from './Components/SizeButtonGroup';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Grid padded columns={2}>
      <Grid.Column width={4}> 
        <SizeButtonGroup filterGroup={() => console.log('filterGroup')}/>
      </Grid.Column>
      <Grid.Column width={12}>
      <CardGrid products={products} />
      </Grid.Column>
    </Grid>
  );
};

export default App;