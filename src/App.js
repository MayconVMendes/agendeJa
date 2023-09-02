import React from "react";
import Header from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <ChakraProvider toastOptions={{ defaultOptions: { position: 'top' } }}>
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
