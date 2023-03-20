import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Loading from "../../../assets/svg/Loading";
import { useState, useEffect } from "react";
import { PrimaryButton } from "./CommonStyled";
import { useCreateProducts, useUpdateProducts } from "../../../api/products";
import { useLayoutEffect } from "react";

let initialValues = {
  name: "",
  brand: "",
  desc: "",
  price: "",
  image: null,
};

export const CreateProducts = ({ product, setOpen }) => {
  if (product) initialValues = product;
  const [post, setPost] = useState(initialValues);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const createProduct = useCreateProducts();
  const updateProduct = useUpdateProducts();

  useLayoutEffect(() => {
    setImage(product?.image.url);
  }, [initialValues]);

  return (
    <StyledCreateProduct>
      <Formik
        initialValues={post}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          brand: Yup.string().required("Brand is required"),
          desc: Yup.string().required("Description is required"),
          price: Yup.number().required("Price is required"),
        })}
        onSubmit={async (values, actions) => {
          if (!product) {
            await createProduct.mutateAsync({ values });
            navigate("../");
          } else {
            await updateProduct.mutateAsync({ values, id: product._id });
            navigate("./");
          }
          setOpen(false);
        }}
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <StyledForm>
            <h3>Create a Product</h3>
            <div className="h-16">
              <Field placeholder="Product name" name="name" />
              <ErrorMessage name="name" component="p" className="text-red-600 text-sm" />
            </div>
            <div className="h-16">
              <Field as="select" name="brand" id="brand">
                <option value="">Select Brand</option>
                <option value="iPhone">iPhone</option>
                <option value="Samsung">Samsung</option>
                <option value="Xiaomi">Xiaomi</option>
                <option value="Motorola">Motorola</option>
                <option value="Other">Other</option>
              </Field>
              <ErrorMessage name="brand" component="p" className="text-red-600 text-sm" />
            </div>
            <div className="h-16">
              <Field placeholder="Description" name="desc" />
              <ErrorMessage name="desc" component="p" className="text-red-600 text-sm" />
            </div>
            <div className="h-16">
              <Field placeholder="Price" type="number" name="price" />
              <ErrorMessage name="price" component="p" className="text-red-600 text-sm" />
            </div>

            <input
              type="file"
              name="image"
              accept="image/"
              required
              onChange={(e) => {
                const reader = new FileReader();
                const file = e.target.files[0];

                if (file) {
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setImage(reader.result);
                  };
                  setFieldValue("image", e.target.files[0]);
                } else {
                  setFieldValue("image", null);
                }
              }}
            />
            <PrimaryButton type="submit" disabled={isSubmitting}>
              {createProduct.isLoading || updateProduct.isLoading ? (
                <Loading className="animate-spin" size={"13px"} />
              ) : (
                "Submit"
              )}
            </PrimaryButton>
          </StyledForm>
        )}
      </Formik>
      <ImagePreview>{image ? <img src={image} alt={post.name} /> : <p>The field image is empty</p>}</ImagePreview>
    </StyledCreateProduct>
  );
};

const StyledCreateProduct = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    align-items: center;
    flex-direction: column;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 45%;
  margin-top: 2rem;

  @media (max-width: 768px) {
    width: 90%;
  }

  select,
  input,
  button {
    padding: 7px;
    min-height: 30px;
    width: 100%;
    outline: none;
    border-radius: 5px;
    border: 1px solid rgb(182, 182, 182);
    margin: 0.3rem 0;
    &:focus {
      border: 2px solid rgb(0, 208, 255);
    }
  }
  select {
    color: rgb(95, 95, 95);
  }
`;

const ImagePreview = styled.div`
  margin: 3.5rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  width: 45%;
  display: grid;
  place-items: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    //width: 100%;
  }
  @media (max-width: 768px) {
    margin: 2rem 0 0 0;
    width: 90%;
  }
`;
