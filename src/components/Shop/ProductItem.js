import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { useDispatch } from "react-redux";
import { itemActions } from "../../store/index.js";
const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { title, price, description,id } = props;

  const item = {
    id,
    name:title,
    price,
    description,
    amount:1
  }
  
  const handleAddTocart = ()=> {
    
    dispatch(itemActions.addItem(item));
  }

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={handleAddTocart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
