import Modal from "./UI/Modal";
import { CartContext } from "../store/CartContext";
import { useContext } from "react";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";

export default function Cart() {
    const { items } = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const cartTotal = items.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }
    return <Modal className="cart" open={userProgressCtx.progress === 'cart'}>
        <h2>Your Cart</h2>
        <ul>
            {items.map(item => <li key={item.id}>{item.name} - ({item.quantity})</li>)}
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