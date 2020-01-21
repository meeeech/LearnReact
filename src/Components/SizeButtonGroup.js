import React from 'react';
import { Button } from 'semantic-ui-react';

const SizeButtonGroup = ({filterGroup}) => {
  return (
    <div>
      {["S", "M", "L", "XL"].map(size => 
        <Button content={size} basic size="small" onClick={() => filterGroup(size)} />
      )}
    </div>
  );
};

export default SizeButtonGroup;