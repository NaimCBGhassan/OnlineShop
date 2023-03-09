import styled from "styled-components";
import { FaClipboard, FaChartBar, FaUsers } from "react-icons/fa";
import Widget from "./Widget";
import { useStats } from "../../../api/stats";
import Loading from "../../../assets/svg/Loading";

export const Summary = () => {
  const { data, isLoading } = useStats();
  console.log(data?.incomes);

  const iconsData = [
    {
      icon: <FaUsers />,
      digits: data?.users[1].total,
      isMoney: false,
      title: "Users",
      color: "rgb(102,108,255)",
      bgColor: "rgba(102,108,255,0.12)",
      percentage: (data?.users[1].total / data?.users[0].total) * 100 - 100,
    },
    {
      icon: <FaClipboard />,
      digits: data?.orders[1].total,
      isMoney: false,
      title: "Orders",
      color: "rgb(38,198,249)",
      bgColor: "rgba(38,198,249,0.12)",
      percentage: (data?.orders[1].total / data?.orders[0].total) * 100 - 100,
    },
    {
      icon: <FaChartBar />,
      digits: data?.incomes[1].total,
      isMoney: true,
      title: "Earning",
      color: "rgb(253,181,40)",
      bgColor: "rgba(253,181,40,0.12)",
      percentage: (data?.incomes[1].total / data?.incomes[0].total) * 100 - 100,
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
      </MainStats>
      <SideStats></SideStats>
    </StyledSummary>
  );
};

const StyledSummary = styled.div`
  width: 100%;
  display: flex;
`;

const MainStats = styled.div`
  flex: 2;
  width: 100%;
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
  height: 170px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const WidgetWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const SideStats = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  width: 100%;
`;
