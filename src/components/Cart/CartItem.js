import classes from './CartItem.module.css';
import { useDispatch } from 'react-redux';
import { itemActions } from '../../store';

const CartItem = (props) => {
  const disptach = useDispatch();
  const { title, amount, total, price,id } = props;

  const item = {
    id,
    name:title,
    price,
  }
 
  const handleAdd = ()=> {
    disptach(itemActions.addItem(item));
  }

  const handleRemove = () =>{
    disptach(itemActions.removeItem(id));
  }



  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{' '}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{amount}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleRemove} >-</button>
          <button onClick={handleAdd} >+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
