import Modal from "./UI/Modal";
import { useContext } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import Input from "./UI/Input";
import Button from "./UI/Button";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    fetch("http://localhost:3000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: data,
        },
      }),
    });
    console.log(data);
  }

  function handleCloseForm() {
    userProgressCtx.hideCheckout();
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseForm}
    >
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>
          Total amount:{" "}
          {new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
          }).format(
            cartCtx.items.reduce(
              (totalPrice, item) => totalPrice + item.price * item.quantity,
              0
            )
          )}
        </p>
        <Input label="Full Name" type="text" id="name"></Input>
        <Input label="E-mail adress" type="email" id="email"></Input>
        <Input label="Street" type="text" id="street"></Input>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code"></Input>
          <Input label="City" type="text" id="city"></Input>
        </div>

        <p className="modal-actions">
          <Button type="button" onClick={handleCloseForm} textOnly>
            Close
          </Button>
          <Button>Submit the order</Button>
        </p>
      </form>
    </Modal>
  );
}
