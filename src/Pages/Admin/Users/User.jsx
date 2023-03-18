import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { useGetUser, useUpdateUser } from "../../../api/user";
import Loading from "../../../assets/svg/Loading";

export const User = () => {
  const { id } = useParams();
  const { data: user = {}, isLoading } = useGetUser(id);
  const updateUser = useUpdateUser();

  return (
    <StyledUser>
      <UserContainer>
        {isLoading ? (
          <Loading size="55px" />
        ) : (
          <Formik
            initialValues={user}
            enableReinitialize={true}
            validationSchema={Yup.object({
              username: Yup.string().min(6, "Minimum 6 characters").required("Username is required"),
              email: Yup.string().required("Email is required").email("Invalid email"),
              isAdmin: Yup.string().required("Role is required"),
            })}
            onSubmit={async (values, actions) => {
              const user = await updateUser.mutateAsync({ id, values });
              actions.setSubmitting(false);
            }}
          >
            {({ handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <h3>User Profile</h3>
                {user.isAdmin ? <Admin>Admin</Admin> : <Customer>Customer</Customer>}
                <div>
                  <label htmlFor="username">Name:</label>
                  <Field id="username" name="username" />
                  <ErrorMessage
                    component="p"
                    name="username"
                    className="flex flex-col items-stretch w-[90vw] md:w-[30vw]"
                  />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <Field id="email" name="email" />
                  <ErrorMessage component="p" name="email" />
                </div>
                <div>
                  <label htmlFor="password">Password:</label>
                  <Field id="password" type="password" name="password" />
                  <ErrorMessage component="p" name="password" />
                </div>
                <div>
                  <label htmlFor="isAdmin">Password:</label>
                  <Field as="select" name="isAdmin" id="isAdmin">
                    <option value="">Select Role</option>
                    <option value="true">Admin</option>
                    <option value="false">User</option>
                  </Field>
                  <ErrorMessage component="p" name="isAdmin" />
                </div>
                <button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loading size="15px" /> : "Submit"}
                </button>
              </Form>
            )}
          </Formik>
        )}
      </UserContainer>
    </StyledUser>
  );
};

const StyledUser = styled.div`
  margin: 3rem;
  display: flex;
  justify-content: center;
`;

const UserContainer = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 45%;
  }
  h3 {
    margin-bottom: 0.5rem;
  }
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 10vh;
  }
  label {
    margin-bottom: 0.2rem;
    color: gray;
  }
  input,
  select {
    outline: none;
    border: none;
    border-bottom: 1px solid gray;
    width: 100%;
  }
  p {
    font-size: 0.875rem;
    line-height: 1.25rem;
    color: rgb(220, 38, 38);
  }
  button {
    padding: 9px 12px;
    border-radius: 5px;
    font-weight: 400;
    letter-spacing: 1.15px;
    background-color: #4b70e2;
    color: #f9f9f9;
    border: none;
    outline: none;
    cursor: pointer;
    margin: 0.5rem 0;
  }
`;

const Admin = styled.span`
  color: rgb(253, 181, 40);
  background-color: rgb(253, 181, 40, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
  margin-bottom: 1rem;
`;

const Customer = styled.span`
  color: rgb(38, 198, 249);
  background-color: rgb(38, 198, 249, 0.12);
  padding: 3px 5px;
  border-radius: 3px;
  font-size: 14px;
`;
