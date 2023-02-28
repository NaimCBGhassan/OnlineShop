import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";
import jwt_decode from "jwt-decode";

import Loading from "../assets/svg/Loading.jsx";
import { useRegister } from "../api/user.js";

export const Register = () => {
  const [repasswordError, setRepasswordError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userLoaded) {
      navigate("/cart");
    }
  }, [auth]);

  const dispatch = useDispatch();
  const { mutateAsync } = useRegister();

  return (
    <div className="grid place-content-center pt-10">
      <h2 className="mb-4">Register</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "", repassword: "" }}
        validationSchema={Yup.object({
          username: Yup.string().min(6, "Minimum 6 characters").required("Username is required"),
          email: Yup.string().required("Email is required").email("Invalid email"),
          password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if (values.password !== values.repassword) setRepasswordError(true);
            if (values.password === values.repassword) setRepasswordError(false);
            values.role = "User";
            const token = await mutateAsync(values);
            const res = jwt_decode(token);
            dispatch(auth({ ...res, token }));
          } catch (error) {
            error.data.forEach(({ message }) => {
              if (message.includes("Username")) setUsernameError({ message });
              if (message.includes("Email")) setEmailError({ message });
            });
          } finally {
            setTimeout(() => {
              setUsernameError(false);
              setEmailError(false);
            }, 2000);
            setSubmitting(false);
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
                name="email"
                placeholder="Email"
                className="px-1 py-2 border-gray-300 border-solid border-2 rounded w-full"
              />
              <ErrorMessage name="email" component="p" className="text-red-600 text-sm " />
              {emailError && <p className="text-red-600 text-sm">{emailError.message}</p>}
            </div>
            <div className="h-[10vh] w-full">
              <Field
                type="password"
                name="password"
                placeholder="Password"
                className="px-1 py-2 border-gray-300 border-solid border-2 rounded w-full"
              />
              <ErrorMessage name="password" component="p" className="text-red-600 text-sm" />
            </div>
            <div className="h-[10vh] w-full">
              <Field
                type="password"
                name="repassword"
                placeholder="Repassword"
                className="px-1 py-2 border-gray-300 border-solid border-2 rounded w-full"
              />
              {repasswordError && <p className="text-red-600 text-sm">Invalid repassword</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="py-3 leading-none rounded font-bold bg-slate-300 hover:bg-slate-400"
            >
              {isSubmitting ? <Loading className="animate-spin" size={"25px"} /> : <span>Register</span>}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
