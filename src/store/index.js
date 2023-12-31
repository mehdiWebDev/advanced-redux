import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialItemState = {
  items: [],
  totalAmount: 0,
  changed: false,
};

const itemSlice = createSlice({
  name: "item",
  initialState: initialItemState,
  reducers: {
    replaceCart(state, action) {
      state.items = action.payload;
      state.totalAmount = action.payload.totalAmount;
    },

    addItem(state, action) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: action.payload.id,
          name: action.payload.name,
          price: action.payload.price,
          amount: 1,
          totalAmount: action.payload.price,
        });
      } else {
        existingItem.amount++;

        existingItem.totalAmount = existingItem.price * existingItem.amount;
      }

      const newTotal = state.items.reduce((acc, curVal) => {
        return acc + curVal.price * curVal.amount;
      }, 0);
      state.totalAmount = newTotal;
    },
    removeItem(state, action) {
      state.changed = true;
      state.totalAmount = state.items.reduce((acc, curVal) => {
        return acc + curVal.price * curVal.amount;
      }, 0);
      const itemToRemove = state.items.find(
        (item) => item.id === action.payload
      );
      if (itemToRemove.amount === 1) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      } else {
        itemToRemove.amount--;
        itemToRemove.totalAmount = itemToRemove.price * itemToRemove.amount;
      }

      const newTotal = state.items.reduce((acc, curVal) => {
        return acc + curVal.price * curVal.amount;
      }, 0);
      state.totalAmount = newTotal;
    },
  },
});

const initialCartState = {
  showCart: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    toogleCart(state) {
      state.showCart = !state.showCart;
    },
  },
});

const store = configureStore({
  reducer: { item: itemSlice.reducer, cart: cartSlice.reducer },
});

export const fetchCartData = () => {
  return async (dispatch) => {
    const getData = async () => {
      const response = await fetch(
        "https://redux-cart-d8b97-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("failed to get Data !");
      }

      const data = await response.json();

      return data;
    };

    try {
      const cartData = await getData();
      console.log(cartData);
      dispatch(itemSlice.actions.replaceCart( cartData || []));
    } catch (Error) {
      console.log(Error);
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(
        "https://redux-cart-d8b97-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );

      if (!response.ok) {
        throw new Error("Sending data failed");
      }
    };

    await sendRequest().catch((e) => console.log(e));
  };
};

export const itemActions = itemSlice.actions;
export const cartActions = cartSlice.actions;

export default store;
