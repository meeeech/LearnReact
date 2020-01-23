import React from 'react';
import { Button } from 'semantic-ui-react';

const SizeButtonGroup = ({ sku }) => {
  return (
    <div>
      {["S", "M", "L", "XL"].map(size => 
        <Button content={size} basic size="tiny" onClick={() => filterGroup(size)} />
      )}
    </div>
  );
};

export default SizeButtonGroup;