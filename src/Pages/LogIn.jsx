import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import * as Yup from "yup";
import jwt_decode from "jwt-decode";

import Loading from "../assets/svg/Loading.jsx";
import { useLogin } from "../api/user.js";
import { auth } from "../store/authSlice";

export const LogIn = () => {
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { mutateAsync } = useLogin();
  return (
    <div className="grid place-content-center pt-10">
      <h2 className="mb-4">Login</h2>
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={Yup.object({
          username: Yup.string().min(6, "Minimum 6 characters").required("Username is required"),
          password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const token = await mutateAsync(values);
            const res = jwt_decode(token);
            dispatch(auth({ ...res, token }));
            setSubmitting(false);
            navigate("/cart");
          } catch (error) {
            error.data.forEach(({ message }) => {
              console.log("Entro");
              if (message.includes("Username")) setUsernameError({ message });
              if (message.includes("password")) setPasswordError({ message });
            });
            setSubmitting(false);
            setTimeout(() => {
              setUsernameError(false);
              setPasswordError(false);
            }, 2000);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col items-stretch w-[90vw] md:w-[30vw]">
            <div className="h-[10vh]">
              <Field
                name="username"
                placeholder="Username"
                className="px-1 py-2 border-gray-300 border-solid border-2 rounded w-full"
              />
              <ErrorMessage name="username" component="p" className="text-red-600 text-sm" />
              {usernameError && <p className="text-red-600 text-sm">{usernameError.message}</p>}
            </div>
            <div className="h-[10vh] w-full">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="px-1 py-2 border-gray-300 border-solid border-2 rounded w-full"
              />
              <ErrorMessage name="password" component="p" className="text-red-600 text-sm" />
              {passwordError && <p className="text-red-600 text-sm">{passwordError.message}</p>}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 leading-none rounded font-bold bg-slate-300 hover:bg-slate-400"
            >
              {isSubmitting ? <Loading className="animate-spin" size={"25px"} /> : <span>Login</span>}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
