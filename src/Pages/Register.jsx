import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export const Register = () => {
  return (
    <div className="h-[91vh] grid place-content-center">
      <h2 className="mb-4">Register</h2>
      <Formik
        initialValues={{ username: "", email: "", password: "", repassword: "" }}
        validationSchema={Yup.object({
          username: Yup.string().min(6, "Minimum 6 characters").required("Username is required"),
          email: Yup.string().required("Email is required").email("Invalid email"),
          password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          setTimeout(() => setSubmitting(false), 2000);
        }}
      >
        {({ handleSubmit, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col w-[90vw] md:w-[30vw] gap-4">
            <Field
              name="username"
              placeholder="Username"
              className="px-1 py-2 border-gray-300 border-solid border-2 rounded"
            />
            <Field name="email" placeholder="Email" />
            <Field name="password" placeholder="Password" />
            <Field name="repassword" placeholder="Repassword" />
            <button type="submit" disabled={isSubmitting}>
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
