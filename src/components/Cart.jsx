import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const { items, addItem, removeItem } = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleAddItem (item) {
        addItem(item);
    }

    function handleRemoveItem (id) {
        removeItem(id);
    }
    return <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
        <h2>Your Cart</h2>
        <ul>
            {items.map(item => <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={() =>handleAddItem(item)} onDecrease={() => handleRemoveItem(item.id)}/>)}
        </ul>
        <p className="cart-total">{new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
            }).format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            <Button onClick={handleCloseCart}>Go to checkout</Button>
        </p>
    </Modal>
}