import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


let isInitial = true;

function App() {

  const cart = useSelector((state)=> state.item.items);

  useEffect(()=> {

    const sendCartData = async ()=> {

      const response =  await fetch('https://redux-cart-d8b97-default-rtdb.firebaseio.com/cart.json',{
        method:"PUT",
        body: JSON.stringify(cart),
      } 
      );

      if(!response.ok){
        throw new Error ('Sending data failed');
      }

    }

    if(isInitial){
      isInitial=false;
      return;
    }
    sendCartData().catch(e=>console.log(e));

  },[cart]);
  return (
    <Layout>
      <Cart />
      <Products />
    </Layout>
  );
}

export default App;
