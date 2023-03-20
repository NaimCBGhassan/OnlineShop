import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetTotalOrder } from "../../../api/stats";
import Loading from "../../../assets/svg/Loading";

export const Order = () => {
  const { id } = useParams();
  const { data: order = {}, isLoading } = useGetTotalOrder(id);

  return (
    <StyledOrder>
      {isLoading ? (
        <Loading size="45px" />
      ) : (
        <>
          <OrderContainer>
            <h2>Order Details</h2>
            <p>
              Delivery status:
              {order.deliveryStatus === "pending" ? (
                <Pending>Pending</Pending>
              ) : order.deliveryStatus === "dispatched" ? (
                <Dispatched>Dispatched</Dispatched>
              ) : order.deliveryStatus === "delivered" ? (
                <Delivered>Delivered</Delivered>
              ) : (
                "Error"
              )}
            </p>
            <h3>Ordered Products</h3>
            <Items>
              {order.products?.map((product, index) => (
                <Item key={index}>
                  <span>{product.description}</span>
                  <span>{product.quantity}</span>
                  <span>{"USD$" + product.quantity * product.unit_price}</span>
                </Item>
              ))}
            </Items>
            <div>
              <h3>Total Price</h3>
              <p>{"USD$" + order.total}</p>
            </div>
            <div>
              <h3>Shipping Details</h3>
              <p>Customer: {order.username}</p>
            </div>
          </OrderContainer>
        </>
      )}
    </StyledOrder>
  );
};

const StyledOrder = styled.div`
  margin: 6rem 0;
  display: flex;
  justify-content: center;
  @media (min-width: 1068px) {
    margin: 3rem;
  }
  h3 {
    margin: 1.5rem 0 0.5rem 0;
  }
`;

const OrderContainer = styled.div`
  max-width: 500px;
  width: 100%;
  height: auto;
  box-shadow: rgba(100, 100, 111, 0.65) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
`;

const Items = styled.div`
  span {
    margin-right: 1.5rem;
    &:first-child {
      font-weight: bold;
    }
  }
`;

const Item = styled.li`
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
`;

const Pending = styled.span`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 14px;
`;

const Dispatched = styled.span`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 14px;
`;

const Delivered = styled.span`
  color: rgb(102, 108, 255);
  background-color: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 5px;
  font-size: 14px;
`;
