import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useEffect } from "react";

export const CheckoutSucces = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order migth take some time to process.</p>
      <p>Check you order status at your profile after about 5mins.</p>
      <p>
        Incase of any inqueries contact the support at <strong>support@onlineshop.com</strong>
      </p>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;
  min-height: 80vh;
  max-width: 800px;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;
