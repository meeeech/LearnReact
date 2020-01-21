import React from 'react';
import { Button, Header } from 'semantic-ui-react';

const SizeButtonGroup = ({filterGroup}) => {
  return (
    <div>
      <Header as="h4" content="Sizes:" />
      {["S", "M", "L", "XL"].map(size => 
        <Button content={size} circular onClick={() => filterGroup(size)} />
      )}
    </div>
  );
};

export default SizeButtonGroup;