import React, { useContext } from 'react';
import CardGrid from './Components/CardGrid';
import SidebarWrapper from './Components/SideBarWrapper';
import { ShoppingContext } from './context';
import { Grid, Button, Label } from 'semantic-ui-react';

const App = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { setVisible, cartTotal } = shoppingContext;

  const Content = () => {
    return(
      <Grid padded='vertically'>
        <Grid.Row>
          <Grid.Column width={15}>
            <div />
          </Grid.Column>
          <Grid.Column width={1}>
            <Button 
              color='yellow'
              label={<Label content={cartTotal.items} />}
              icon="cart" 
              onClick={() => setVisible(true)} 
            />
          </Grid.Column>
        </Grid.Row> 
        <Grid.Row>
         <CardGrid />
        </Grid.Row>
      </Grid>
    );
  };

  return (
    <SidebarWrapper content={<Content />} />
  );
};

export default App;