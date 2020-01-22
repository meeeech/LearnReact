import React, { createContext, useState, useEffect } from 'react';

const ShoppingContext = createContext(null);
const { Provider } = ShoppingContext; 

const StateProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState({ cost: 0, items: 0 });

  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  const toggleItem = (item, action) => {
    const index = cartItems.map(x => x.product.sku).indexOf(item)
    const temp = cartItems 

    if (index > -1) {
      if (action === '+') temp[index].quantity++;
      else if (action==='x') temp.splice(index);
      else {
        if (temp[index].quantity === 1) temp.splice(index);
        else temp[index].quantity--;
      }
    }
    else temp.push({ product: data[item], quantity: 1 });

    const tempTotalCost = temp.length == 0 ? 
      0 : temp.map(value => value.product.price * value.quantity).reduce((a,b) => a+b);

    const tempTotalItems = temp.length == 0 ? 
      0 : temp.map(value => value.quantity).reduce((a,b) => a+b);
    
    setCartTotal({ cost: tempTotalCost, items: tempTotalItems });
    setVisible(true);
    setCartItems(temp);
  }

  const api = {
    visible,
    setVisible,
    cartItems,
    setCartItems, 
    products, 
    toggleItem,
    cartTotal
  };

  return <Provider value={api}>{children}</Provider>;
}

export {ShoppingContext, StateProvider };