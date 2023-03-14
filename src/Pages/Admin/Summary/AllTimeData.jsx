import styled from "styled-components";

import { useGetProducts } from "../../../api/products";
import { useGetTotalOrders, useTotalIncomes } from "../../../api/stats";
import { useGetUsers } from "../../../api/user";
import Loading from "../../../assets/svg/Loading";

const AllTimeData = () => {
  const { data: products = [], isLoading: loadingProducts } = useGetProducts();
  const { data: users = [], isLoading: loadingUsers } = useGetUsers();
  const { data: orders = [], isLoading: loadingOrders } = useGetTotalOrders();
  const { data: totalIncomes, isLoading: loadingTotalIncomes } = useTotalIncomes();

  return (
    <Main>
      <>
        <h3>All time</h3>
        <Info>
          <Title>Users</Title>
          {loadingUsers ? (
            <div className="w-[80%] text-center">
              <Loading size="15px" />
            </div>
          ) : (
            <Data>{users.length}</Data>
          )}
        </Info>
        <Info>
          <Title>Products</Title>
          {loadingProducts ? (
            <div className="w-[80%] text-center">
              <Loading size="15px" />
            </div>
          ) : (
            <Data>{products.length}</Data>
          )}
        </Info>
        <Info>
          <Title>Orders</Title>
          {loadingOrders ? (
            <div className="w-[80%] text-center">
              <Loading size="15px" />
            </div>
          ) : (
            <Data>{orders.length}</Data>
          )}
        </Info>
        <Info>
          {loadingTotalIncomes ? (
            <div className="w-[80%] text-center">
              <Loading size="15px" />
            </div>
          ) : (
            <>
              <Title>Earning</Title>
              <Data>${totalIncomes}</Data>
            </>
          )}
        </Info>
      </>
    </Main>
  );
};

export default AllTimeData;

const Main = styled.div`
  background-color: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  margin-top: 1.5rem;
  border-radius: 5px;
  padding: 1rem;
  font-size: 14px;
`;

const Info = styled.div`
  display: flex;
  margin-top: 1rem;
  padding: 0.3rem;
  border-radius: 3px;
  background-color: rgba(38, 198, 249, 0.12);
  &:nth-child(even) {
    background-color: rgba(102, 108, 255, 0.12);
  }
`;

const Title = styled.div`
  flex: 1;
`;

const Data = styled.div`
  flex: 1;
  font-weight: 700;
`;
