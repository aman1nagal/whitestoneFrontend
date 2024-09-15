import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "@/components/Login/Login";
import { authLoginState, setLoginState } from "@/slices/auth/loginStates";

const LoginIndexPage = () => {

  return (
    <>
      <Login />
    </>
  );
};

export default LoginIndexPage;
