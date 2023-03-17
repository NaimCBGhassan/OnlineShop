import styled from "styled-components";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import EditProduct from "../Products/EditProduct";
import { useDeleteUser, useGetUsers } from "../../../api/user";

export function UsersList() {
  const [user, setUsers] = useState(false);
  const { data: users = [], isLoading } = useGetUsers();
  const deleteUser = useDeleteUser();
  const navigate = useNavigate();

  const rows = users.map((user) => {
    return {
      id: user._id,
      uName: user.username,
      uEmail: user.email,
      isAdmin: user.isAdmin,
    };
  });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "uName", headerName: "Username", width: 150 },
    { field: "uEmail", headerName: "Email", width: 200 },
    {
      field: "isAdmin",
      headerName: "Admin",
      width: 100,
      renderCell: (params) => <div>{params.row.isAdmin ? <Admin>Admin</Admin> : <Customer>Customer</Customer>}</div>,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <Actions>
          <Delete
            onClick={() => {
              deleteUser.mutateAsync(params.row.id);
            }}
            disabled={isLoading}
          >
            Delete
          </Delete>
          <View onClick={() => navigate(`../user/${params.row.id}`)}>View</View>
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

const ImageContainer = styled.div`
  img {
    height: 40px;
    margin: 0 auto;
  }
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

const Delete = styled.button`
  background-color: rgb(255, 77, 73);
`;
const View = styled.button`
  background-color: rgb(114, 225, 40);
`;

const Admin = styled.div`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;

const Customer = styled.div`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
