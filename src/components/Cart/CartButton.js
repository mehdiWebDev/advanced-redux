import classes from './CartButton.module.css';
import { useDispatch,useSelector } from 'react-redux';
import { cartActions } from '../../store';

const CartButton = () => {
  const dispatch = useDispatch();

  const items = useSelector((state)=> state.item.items)

  const handleToogleCart = ()=> {
    dispatch(cartActions.toogleCart());
  }

  return (
    <button className={classes.button} onClick={handleToogleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{items.length}</span>
    </button>
  );
};

export default CartButton;
