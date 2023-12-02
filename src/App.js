import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/Footer/Footer";
import { addInfoUser } from "./redux/userSliceDados";
import { changeUser } from "./redux/userSlice";
import { useDispatch } from "react-redux";
import useTokenVerify from "./hooks/login/useTokenVerify";
import useGetUserById from "./hooks/user/useGetUserById";
import { useToast } from "@chakra-ui/react";
import BusinessHeader from "./components/BusinessHeader/BusinessHeader";

function App() {
  const [isNotAdmin, setIsNotAdmin] = useState(false);
  const userData = useSelector((state) => state?.userDados);
  const navigate = useNavigate();
  const [isToken, setIsToken] = useState();
  const tokenStorage = JSON.parse(localStorage.getItem("token"));
  const { addUser } = useGetUserById();
  const dispatch = useDispatch();
  const {searchTokenUser} = useTokenVerify();
  const toast = useToast();

  useEffect(() => {
    if (userData?.role === "ENTERPRISE") {
      setIsNotAdmin(true);
    }
  }, [userData, navigate]);

  useEffect(() => {
    if(!isToken) {
      searchUser();
    }
  })

  const searchUser = async () => {
    setIsToken(tokenStorage)
    const dadosToken = await searchTokenUser(tokenStorage.token);
    const dadosUser = await addUser(dadosToken.id, tokenStorage.token);
    dispatch(changeUser(dadosToken.id));
    dispatch(addInfoUser(dadosUser));
  }

  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: "top" } }}>
      <div className="App">
        <Header />
        <main className="content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ChakraProvider>
  );
}

export default App;
