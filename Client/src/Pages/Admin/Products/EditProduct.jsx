import styled from "styled-components";
import { useCreateProducts, useGetProduct } from "../../../api/products";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { CreateProducts } from "./CreateProducts";
import Loading from "../../../assets/svg/Loading";

export default function EditProduct({ open, setOpen, product, setProduct }) {
  const handleClose = () => {
    setProduct(false);
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth={"md"}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent>
          <CreateProducts product={product} setOpen={setOpen} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const Button = styled.button`
  border: none;
  outline: none;
  padding: 3px 5px;
  color: white;
  border-radius: 3px;
  cursor: pointer;
  background-color: #4b70e2;
`;
