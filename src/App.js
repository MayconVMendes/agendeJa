import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/Footer/Footer";
import BusinessHeader from "./components/BusinessHeader/BusinessHeader";

function App() {
  const [isNotAdmin, setIsNotAdmin] = useState(false);
  const userData = useSelector((state) => state?.userDados);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.role === "ENTERPRISE") {
      setIsNotAdmin(true);
    }
  }, [userData, navigate]);

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
