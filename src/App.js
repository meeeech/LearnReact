import React, { useContext } from 'react';
import CardGrid from './Components/CardGrid';
import SidebarWrapper from './Components/SideBarWrapper';
import { ShoppingContext } from './context';
import { Grid, Button, Label, Header } from 'semantic-ui-react';

const App = () => {
  const shoppingContext = useContext(ShoppingContext);
  const { setVisible, cartTotal } = shoppingContext;

  const Content = () => {
    return(
      <Grid padded='vertically'>
        <Grid.Row>
          <Grid.Column width={13}/>
          <Grid.Column width={3} >
            <Button.Group onClick={() => setVisible(true)}> 
              <Button icon='user' attached='left' basic color="yellow" />
              <Button 
                attached='right'
                color='yellow'
                label={<Label content={cartTotal.items} />}
                icon="cart"  
              />
            </Button.Group>
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