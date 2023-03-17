import styled from "styled-components";
import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";

import { useDeleteProducts, useGetProducts } from "../../../api/products";
import EditProduct from "./EditProduct";

export function ProductsList() {
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState(false);
  const { data: products = [] } = useGetProducts();
  const { mutateAsync, isLoading: mutateLoading } = useDeleteProducts();
  const navigate = useNavigate();

  const rows = products.map((product) => {
    return {
      id: product._id,
      imageUrl: product.image.url,
      pName: product.name,
      pDesc: product.desc,
      price: product.price,
    };
  });
  const columns = [
    { field: "id", headerName: "ID", width: 220 },
    {
      field: "imageUrl",
      headerName: "Image",
      width: 80,
      renderCell: (params) => (
        <ImageContainer>
          <img src={params.row.imageUrl} alt=""></img>
        </ImageContainer>
      ),
    },
    { field: "pName", headerName: "Name", width: 130 },
    { field: "pDesc", headerName: "Description", width: 130 },
    { field: "price", headerName: "Price", width: 90 },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 170,
      renderCell: (params) => (
        <Actions>
          <Delete
            onClick={() => {
              mutateAsync(params.row.id);
            }}
            disabled={mutateLoading}
          >
            Delete
          </Delete>
          <Edit
            variant="outlined"
            onClick={() => {
              const [product] = products.filter((product) => product._id === params.row.id);
              setProduct(product);
              setOpen(true);
            }}
          >
            Edit
          </Edit>
          <View onClick={() => navigate(`/admin/products/product/${params.row.id}`)}>View</View>
        </Actions>
      ),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} rowsPerPageOptions={[5]} disableRowSelectionOnClick />
      {open ? <EditProduct open={open} setOpen={setOpen} product={product} setProduct={setProduct} /> : null}
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
const Edit = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;
