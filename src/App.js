import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData } from './store';


let isInitial = true;

function App() {

  const dispatch = useDispatch();

  const cart = useSelector((state)=> state.item.items);

  useEffect(()=> {

    if(isInitial){
      isInitial=false;
      return;
    }

    dispatch(sendCartData(cart))
  },[cart]);
  return (
    <Layout>
      <Cart />
      <Products />
    </Layout>
  );
}

export default App;
