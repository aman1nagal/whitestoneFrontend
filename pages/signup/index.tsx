import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import {
  RegistraionSVG,
  RegistraionSVG5,
} from "@/components/common/RegistraionSVG";
import { useSignUpMutation } from "@/slices/auth";

const ValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("You've entered an invalid e-mail.")
    .required("Email is required"),
  password: Yup.string().required("Please enter your password"),
  username: Yup.string().required("Please enter your User Name"),
});

const RegisterationTypes = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(true);
  const [signUp] = useSignUpMutation();

  const handleSubmit = async (values) => {
    try {
      await signUp(values); // Perform the sign-up logic (call to API, etc.)
      localStorage.setItem("auth", "true"); // Set authentication state
      router.push("/"); // Redirect to home page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full md:w-1/2 bg-blue-100 flex items-center justify-center relative">
        <div className="hidden md:inline-block">
          <RegistraionSVG />
        </div>
      </div>
      <div className="absolute z-10 inset-0 flex items-center justify-center p-4 md:p-0">
        <div className="max-w-md w-full p-6 md:p-8 rounded-3xl shadow-wrapShadow bg-white">
          <div className="flex">
            <div className="w-8/12">
              <h2 className="text-base md:text-[20px] text-black mt-1">
                Welcome to Lorem
              </h2>
              <h1 className="text-[40px] md:text-[55px] font-medium text-black">
                Sign up
              </h1>
            </div>
            <div className="w-1/3">
              <span className="text-sm text-[#8D8D8D] hover:text-gray-800">
                Have an Account?{" "}
              </span>
              <h1
                onClick={() => router.push("/login")}
                className="text-blue-500 text-sm cursor-pointer"
              >
                Sign in
              </h1>
            </div>
          </div>
          <Formik
            initialValues={{
              email: "",
              password: "",
              username: "",
            }}
            // validationSchema={ValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="mt-8">
                {" "}
                {/* Use Formik's Form component */}
                <div className="flex flex-col-reverse md:flex-col">
                  <div className="flex flex-col mt-7 md:mt-0">
                    <div className="mb-6">
                      <label
                        htmlFor="email"
                        className="block text-sm md:text-base"
                      >
                        Enter your email
                      </label>
                      <Field
                        type="text"
                        id="email"
                        name="email"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-[#808080] h-14"
                        placeholder="Email address"
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-left text-xs mt-1 pl-1">
                          {errors.email}
                        </div>
                      )}
                    </div>
                    <div className="mb-6 gap-4">
                      <div>
                        <label
                          htmlFor="username"
                          className="block text-sm md:text-base"
                        >
                          User name
                        </label>
                        <Field
                          type="text"
                          id="username"
                          name="username"
                          className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-[#808080] h-14"
                          placeholder="Username"
                        />
                        {errors.username && touched.username && (
                          <div className="text-red-500 text-left text-xs mt-1 pl-1">
                            {errors.username}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="mb-6 relative">
                      <label
                        htmlFor="password"
                        className="block text-sm md:text-base"
                      >
                        Enter your Password
                      </label>
                      <Field
                        type={showPassword ? "password" : "text"}
                        id="password"
                        name="password"
                        className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:text-[#808080] h-14"
                        placeholder="Password"
                      />
                      <div
                        className="absolute top-12 right-3 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <AiFillEye size={20} color="#9CA3AF" />
                        ) : (
                          <AiFillEyeInvisible size={20} color="#9CA3AF" />
                        )}
                      </div>
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-left text-xs mt-1 pl-1">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div>
                      <button
                        type="submit" // Ensure the button has type submit
                        className="w-full py-3 px-4 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e5921d]"
                      >
                        Sign up
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="w-full md:w-1/2 bg-white hidden md:flex items-center justify-center relative">
        <div className="hidden md:inline-block">
          <RegistraionSVG5 />
        </div>
      </div>
    </div>
  );
};

export default RegisterationTypes;
