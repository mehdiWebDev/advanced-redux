import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const items = useSelector((state) => state.item.items);
  const isCartshown = useSelector((state) => state.cart.showCart);
  return (
    <>
      {isCartshown && (
        <Card className={classes.cart}>
          <h2>Your Shopping Cart</h2>
          <ul>
            {items.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                title={item.name}
                price={item.price}
                amount={item.amount}
                total={item.totalAmount}
              />
            ))}
          </ul>
        </Card>
      )}
    </>
  );
};

export default Cart;
