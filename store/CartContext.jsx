import { createContext, useReducer } from "react";

export const CartContext = createContext({ items: [],
    addItem: (item) => {},
    removeItem: (id) => {},
});

function cartReducer(state, action) {
    if (action.type === "ADD") {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.item.id);
        const updatedItems = [...state.items];

        if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {...existingItem, quantity: existingItem.quantity + 1};
            updatedItems[existingItemIndex] = updatedItem;
        } else {
            updatedItems.push({...action.item, quantity: 1});
        }
        return {...state, items: updatedItems};
    }

    if (action.type === "REMOVE") {
        const existingItemIndex = state.items.findIndex((item) => item.id === action.id);
        const updatedItems = [...state.items];

        if (existingItemIndex > -1) {
            const existingItem = state.items[existingItemIndex];
            const updatedItem = {...existingItem, quantity: existingItem.quantity - 1};
            if (updatedItem.quantity === 0) {
                updatedItems.splice(existingItemIndex, 1);
            } else {
                updatedItems[existingItemIndex] = updatedItem;
            }
        return {...state, items: updatedItems};
        }
    }
    return state;
}
export function CartContextProvider({children}) {
    const [cart, dispatchCartAction] = useReducer(cartReducer, {items: []})

    function addItem(item) {
        dispatchCartAction({type: "ADD", item});
    }

    function removeItem(id) {
        dispatchCartAction({type: "REMOVE", id});
    }

    const cartContext = {
        items: cart.items,
        addItem,
        removeItem
    }
    return <CartContext value={cartContext}>{children}</CartContext>;
}