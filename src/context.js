import React, { createContext, useState, useEffect } from 'react';
import db from './firebase';

const ShoppingContext = createContext(null);
const { Provider } = ShoppingContext; 

const StateProvider = ({ children }) => {
  const [data, setData] = useState({});
  const [visible, setVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState({ cost: 0, items: 0 });
  const [inventory, setInventory] = useState({})

  const products = Object.values(data);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchInventory = snap => {
      if (snap.val()) setInventory(snap.val());
    }
    db.on('value', fetchInventory, error=> alert(error));
    return () => { db.off('value', fetchInventory); };
  }, []);

  const toggleItem = (item, action, size) => {
    const index = cartItems.map(x => x.sizeSku).indexOf(`${item}_${size}`);
    console.log(index)
    const temp = cartItems;
    const tempInv = inventory;

    if (index > -1) {
      const sku = temp[index].product.sku;
      if (action === '+') {
        temp[index].quantity++;
        tempInv[sku][size]--;
      }
      else if (action==='x') {
        tempInv[sku][size] = tempInv[sku][size] + temp[index].quantity;
        temp.splice(index);
      }
      else {
        if (temp[index].quantity === 1) {
          temp.splice(index);
          tempInv[sku][size]++;
        }
        else {
          temp[index].quantity--;
          tempInv[sku][size]++;
        }
      }
    }
    else {
      temp.push({ 
        product: data[item], 
        quantity: 1, 
        size: size,
        sizeSku: `${data[item].sku}_${size}` 
      });
      tempInv[data[item].sku][size]--;
    }
    const tempTotalCost = temp.length === 0 ? 
      0 : temp.map(value => value.product.price * value.quantity).reduce((a,b) => a+b);

    const tempTotalItems = temp.length === 0 ? 
      0 : temp.map(value => value.quantity).reduce((a,b) => a+b);
    
    setCartTotal({ cost: tempTotalCost, items: tempTotalItems });
    setVisible(true);
    setInventory(tempInv)
    console.log(tempInv[item])
    setCartItems(temp)
  }

  const api = {
    visible,
    setVisible,
    cartItems,
    setCartItems, 
    products, 
    toggleItem,
    cartTotal,
    inventory
  };

  return <Provider value={api}>{children}</Provider>;
}

export {ShoppingContext, StateProvider };