import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector,useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { sendCartData } from './store';
import { fetchCartData } from './store';


let isInitial = true;

function App() {

  const dispatch = useDispatch();

  const cart = useSelector((state)=> state.item.items);
  const changed = useSelector((state)=> state.item.changed);


  useEffect(()=> {
    dispatch(fetchCartData())
  },[dispatch])

  useEffect(()=> {
console.log("je suis la");
    if(isInitial){
      isInitial=false;
      return;
    }
    console.log(changed);
    changed && dispatch(sendCartData(cart))
  },[cart,changed,dispatch]);
  return (
    <Layout>
      <Cart />
      <Products />
    </Layout>
  );
}

export default App;
