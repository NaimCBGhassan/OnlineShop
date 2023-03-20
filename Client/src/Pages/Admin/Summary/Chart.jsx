import styled from "styled-components";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Loading from "../../../assets/svg/Loading";

const Chart = ({ weekSales, isLoading }) => {
  const actualDay = new Date().getDay();

  if (weekSales) {
    weekSales = [...weekSales?.splice(actualDay + 1), ...weekSales?.slice(0, actualDay + 1)];
  }
  return (
    <StyledChart>
      {isLoading ? (
        <div className="h-full grid place-items-center">
          <Loading size="45px" />
        </div>
      ) : (
        <>
          <h3>Last 7 Days Earnings (USD$)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={weekSales}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="days" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </>
      )}
    </StyledChart>
  );
};

export default Chart;

const StyledChart = styled.div`
  width: 100%;
  height: 300px;
  margin-top: 2rem;
  padding: 1rem;
  border: 2px solid rgba(48, 51, 78, 0.2);
  border-radius: 5px;
  h3 {
    margin-bottom: 1rem;
  }
`;
