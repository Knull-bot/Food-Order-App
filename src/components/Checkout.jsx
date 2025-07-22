import Modal from "./UI/Modal";
import { useContext, useActionState } from "react";
import { CartContext } from "../store/CartContext";
import { UserProgressContext } from "../store/UserProgressContext";
import Input from "./UI/Input";
import Button from "./UI/Button";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    error,
    fetchedData: data,
    sendRequest,
    clearData,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  async function checkoutAction(prevState, fd) {
    const data = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: data,
        },
      })
    );
    console.log(data);
  }

  function handleCloseForm() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  const [formState, formAction, isSending] = useActionState(checkoutAction);

  let actions = (
    <>
      <Button type="button" onClick={handleCloseForm} textOnly>
        Close
      </Button>
      <Button>Submit the order</Button>
    </>
  );

  if (isSending) {
    actions = "Sending...";
  }

  if (data && !error) {
    console.log("Успешность процесса:", data);
    console.log("Ошибка:", error);
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order was successfully sent.</p>
        <p className="actions">
          <Button onClick={handleCloseForm}>Okay</Button>
        </p>
      </Modal>
    );
  } else {
    console.log("Ошибка:", error);
    console.log("Данные:", data);
  }
  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      onClose={handleCloseForm}
    >
      <form action={formAction}>
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
        {error && (
          <Error
            title="Sending the order failed. Try again later..."
            message={error}
          ></Error>
        )}
        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
