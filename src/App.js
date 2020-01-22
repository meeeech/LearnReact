import React, { useContext } from 'react';
import CardGrid from './Components/CardGrid';
import SidebarWrapper from './Components/SideBarWrapper';
import { ShoppingContext } from './context';
import { Grid, Button  } from 'semantic-ui-react';

const App = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { setVisible } = shoppingContext;

  const Content = () => {
    return(
      <Grid padded='vertically'>
        <Grid.Row>
          <Grid.Column width={15}>
            <div />
          </Grid.Column>
          <Grid.Column width={1}>
            <Button 
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