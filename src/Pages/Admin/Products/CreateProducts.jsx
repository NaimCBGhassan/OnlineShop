import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Loading from "../../../assets/svg/Loading";
import { useState } from "react";

const initialValues = {
  image: null,
  name: "",
  brand: "",
  desc: "",
  price: "",
};
export const CreateProducts = () => {
  const [image, setImage] = useState("");

  return (
    <StyledCreateProduct>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log(values);
          console.log(actions);
          actions.setSubmitting(false);
        }}
      >
        {({ handleSubmit, setFieldValue, isSubmitting }) => (
          <StyledForm>
            <h3>Create a Product</h3>
            <Field placeholder="Product name" name="name" />
            <Field placeholder="Brand" name="brand" />
            <Field placeholder="Description" name="desc" />
            <Field placeholder="Price" type="number" name="price" />
            <input
              type="file"
              name="image"
              accept="image/"
              onChange={(e) => {
                const reader = new FileReader();
                const file = e.target.files[0];

                if (file) {
                  reader.readAsDataURL(file);
                  reader.onloadend = () => {
                    setImage(reader.result);
                    setFieldValue("image", file);
                  };
                } else {
                  setFieldValue("image", null);
                }
              }}
            />
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? <Loading className="animate-spin" size={"13px"} /> : "Submit"}
            </button>
          </StyledForm>
        )}
      </Formik>
      <ImagePreview>{image ? <img src={image} alt="Product image" /> : <p>The field image is empty</p>}</ImagePreview>
    </StyledCreateProduct>
  );
};

const StyledCreateProduct = styled.div`
  display: flex;
  @media (max-width: 1024px) {
    align-items: center;
    flex-direction: column;
  }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  //width: 80%;
  margin-top: 2rem;
  select,
  input,
  button {
    padding: 7px;
    min-height: 30px;
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

  input[type="file"] {
    content: "Rosario";
  }
`;

const ImagePreview = styled.div`
  margin: 3.5rem 0 2rem 2rem;
  padding: 2rem;
  border: 1px solid rgb(183, 183, 183);
  //width: 80%;
  display: grid;
  place-items: center;
  padding: 2rem;
  color: rgb(78, 78, 78);
  img {
    //width: 100%;
  }
  @media (max-width: 1024px) {
    margin: 2rem 0 0 0;
  }
`;
