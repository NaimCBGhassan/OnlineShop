import styled from "styled-components";
import moment from "moment";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import { useGetTotalOrders, useUpdateOrder } from "../../../api/stats";
import Loading from "../../../assets/svg/Loading";
import { useState } from "react";

export function OrdersList() {
  const [idClicked, setIdClicked] = useState(null);
  const { data: orders = [] } = useGetTotalOrders();
  const { mutateAsync, isLoading } = useUpdateOrder();
  const navigate = useNavigate();

  const rows = orders.map((order) => {
    return {
      id: order._id,
      cName: order.username,
      amount: order.total,
      dStatus: order.deliveryStatus,
      date: moment(order.createdAt).fromNow(),
    };
  });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "cName", headerName: "Username", width: 120 },
    { field: "amount", headerName: "Amount(USD$)", width: 100 },
    {
      field: "dStatus",
      headerName: "Status",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="w-full flex justify-center">
            {params.row.dStatus === "pending" ? (
              <Pending>{idClicked === params.row.id && isLoading ? <Loading size="15px" /> : "Pending"}</Pending>
            ) : params.row.dStatus === "dispatched" ? (
              <Dispatched>
                {idClicked === params.row.id && isLoading ? <Loading size="15px" /> : "Dispatched"}
              </Dispatched>
            ) : params.row.dStatus === "delivered" ? (
              <Delivered>{idClicked === params.row.id && isLoading ? <Loading size="15px" /> : "Delivered"}</Delivered>
            ) : (
              "Error"
            )}
          </div>
        );
      },
    },
    { field: "date", headerName: "Date", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 220,
      renderCell: (params) => (
        <Actions>
          <DispatchBtn
            disabled={isLoading}
            onClick={() => {
              setIdClicked(params.row.id);
              mutateAsync({ values: "dispatched", id: params.row.id });
            }}
          >
            Dispatch
          </DispatchBtn>
          <DeliveryBtn
            disabled={isLoading}
            onClick={() => {
              setIdClicked(params.row.id);
              mutateAsync({ values: "delivered", id: params.row.id });
            }}
          >
            Deliver
          </DeliveryBtn>
          <View disabled={isLoading} onClick={() => navigate(`../order/${params.row.id}`)}>
            View
          </View>
        </Actions>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableRowSelectionOnClick />
    </div>
  );
}

const Pending = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Dispatched = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Delivered = styled.div`
  color: rgb(102, 108, 255);
  background-color: rgb(102, 108, 255, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Actions = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    outline: none;
    padding: 3px 5px;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const DispatchBtn = styled.button`
  background-color: rgb(38, 198, 249);
`;
const DeliveryBtn = styled.button`
  background-color: rgb(102, 108, 255);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
