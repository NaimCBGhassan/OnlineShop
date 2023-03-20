import styled from "styled-components";
import { FaClipboard, FaChartBar, FaUsers } from "react-icons/fa";
import Widget from "./Widget";
import { useStats } from "../../../api/stats";
import Loading from "../../../assets/svg/Loading";
import Chart from "./Chart";
import Transactions from "./Transactions";
import AllTimeData from "./AllTimeData";

export const Summary = () => {
  const { data, isLoading } = useStats();
  const iconsData = [
    {
      icon: <FaUsers />,
      digits: (() => {
        if (data?.users.length === 0) return 0;
        if (data?.users.length === 1) return data?.users[0].total;
        return data?.users[1].total;
      })(),
      isMoney: false,
      title: "Users",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: (() => {
        if (data?.users.length === 0) return 0;
        if (data?.users.length === 1) return Infinity;
        return (data?.users[1].total / data?.users[0].total) * 100 - 100;
      })(),
    },
    {
      icon: <FaClipboard />,
      digits: (() => {
        if (data?.orders.length === 0) return 0;
        if (data?.orders.length === 1) return data?.orders[0].total;
        return data?.orders[1].total;
      })(),
      isMoney: false,
      title: "Orders",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: (() => {
        if (data?.orders.length === 0) return 0;
        if (data?.orders.length === 1) return Infinity;
        return (data?.orders[1].total / data?.orders[0].total) * 100 - 100;
      })(),
    },
    {
      icon: <FaChartBar />,
      digits: (() => {
        if (data?.incomes.length === 0) return 0;
        if (data?.incomes.length === 1) return data?.incomes[0].total;
        return data?.incomes[1].total;
      })(),
      isMoney: true,
      title: "Earning",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40,0.12)",
      percentage: (() => {
        if (data?.incomes.length === 0) return 0;
        if (data?.incomes.length === 1) return Infinity;
        return (data?.incomes[1].total / data?.incomes[0].total) * 100 - 100;
      })(),
    },
  ];

  return (
    <StyledSummary>
      <MainStats>
        <Overview>
          <Title>
            <h2>Overview</h2>
            <p>How your shop is performing compared to the previous month</p>
          </Title>
          <WidgetWrapper>
            {isLoading ? (
              <Loading size={"14px"} />
            ) : (
              iconsData?.map((data, index) => <Widget key={index} data={data} />)
            )}
          </WidgetWrapper>
        </Overview>
        <Chart weekSales={data?.weekSales} isLoading={isLoading} />
      </MainStats>
      <SideStats>
        <Transactions getOrders={data?.getOrders} isLoading={isLoading} />
        <AllTimeData />
      </SideStats>
    </StyledSummary>
  );
};

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  @media (min-width: 1064px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const MainStats = styled.div`
  width: 100%;
  @media (min-width: 1064px) {
    width: 66%;
  }
`;

const Title = styled.div`
  p {
    font-size: 14px;
    color: rgba(234, 234, 255, 0.68);
  }
`;

const Overview = styled.div`
  background-color: rgb(48, 51, 78);
  color: rgba(234, 234, 255, 0.87);
  width: 100%;
  padding: 1.5rem;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  gap: 1rem;
  width: 100%;
  @media (min-width: 1064px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const SideStats = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (min-width: 1064px) {
    width: 34%;
    margin-left: 2rem;
  }
`;
