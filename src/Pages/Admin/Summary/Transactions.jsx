import styled from "styled-components";
import moment from "moment";

import Loading from "../../../assets/svg/Loading";

const Transactions = ({ getOrders, isLoading }) => {
  return (
    <StyledTransaction>
      {isLoading ? (
        <div className="text-center">
          <Loading size="45px" />
        </div>
      ) : (
        <>
          <h3>Latest Transactions</h3>
          {getOrders?.map((order, index) => (
            <Transaction key={index}>
              <p>{order.username}</p>
              <p>${order.total}</p>
              <p>{moment(order.createdAt).fromNow()}</p>
            </Transaction>
          ))}
        </>
      )}
    </StyledTransaction>
  );
};

export default Transactions;

const StyledTransaction = styled.div`
  background-color: rgb(47, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  padding: 1rem;
  border-radius: 5px;
`;

const Transaction = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 1rem;
  padding: 0.5rem;
  border-radius: 3px;
  background-color: rgba(38, 198, 249, 0.12);

  p {
    flex: 1;
  }
  &:nth-child(even) {
    background-color: rgba(102, 108, 255, 0.12);
  }
`;
