import {configureStore,createSlice } from "@reduxjs/toolkit";


const initialItemState = {
    items: [],
    totalAmount:14

};

const itemSlice = createSlice({
    name: "item",
    initialState: initialItemState,
    reducers: {
        addItem(state, action) {
            const existingItem = state.items.find((item)=> item.id === action.payload.id );

            if (!existingItem) {
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    amount: 1,
                    totalAmount:action.payload.price
                });
            }else {
                existingItem.amount++;
                
                existingItem.totalAmount = existingItem.price * existingItem.amount ;
            }

            const newTotal =state.items.reduce((acc,curVal) => { return acc + curVal.price * curVal.amount },0 );
            console.log(newTotal);
            state.totalAmount = newTotal;

            
        },
        removeItem(state, action) {
            state.totalAmount = state.items.reduce((acc,curVal) => { return acc + curVal.price * curVal.amount },0 );
            const itemToRemove = state.items.find((item) => item.id === action.payload);
            if (itemToRemove.amount === 1) {
             state.items = state.items.filter((item)=> item.id !== action.payload)
            }else {
                itemToRemove.amount--;
                itemToRemove.totalAmount = itemToRemove.price * itemToRemove.amount ;
            }

            const newTotal =state.items.reduce((acc,curVal) => { return acc + curVal.price * curVal.amount },0 );
            console.log(newTotal);
            state.totalAmount = newTotal;
        },


    },
});

const initialCartState = {
    showCart:false
}

const cartSlice = createSlice({
    name:"cart",
    initialState:initialCartState,
    reducers:{
        toogleCart(state){
            state.showCart=!state.showCart;
        }
    }
})




const store = configureStore({reducer:{item:itemSlice.reducer,cart:cartSlice.reducer}});

export const itemActions = itemSlice.actions;
export const cartActions = cartSlice.actions;

export default store;