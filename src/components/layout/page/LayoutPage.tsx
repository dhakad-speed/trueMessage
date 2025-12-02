"use client";

import { Fragment, useState } from "react";
import Navbar from "../Navbar/Navbar";
import AppBox from "../../common/Box";
import ProviderContainerForSession from "../sessionPage/Provider";
import { Provider } from "react-redux";
import "./layout.scss";
import { Container } from "@mui/material";
import { store } from "@/src/features/store";
import { ContextProvider } from "@/src/context/Context";

interface LayoutPage {
  children: React.ReactNode;
}

const LayoutPage = ({ children }: LayoutPage) => {
  const [notification, SetNotification] = useState(false);
  const [invisible, setInvisible] = useState(false);
  return (
    <Fragment>
      <ProviderContainerForSession>
        <Provider store={store}>
          <ContextProvider
            value={{
              setNotify: SetNotification,
              setInvisible,
              isNotify: notification,
              isInvisible: invisible,
            }}
          >
            <Navbar />
            <Container>
              <AppBox component={"main"}>{children}</AppBox>
            </Container>
          </ContextProvider>
        </Provider>
      </ProviderContainerForSession>
    </Fragment>
  );
};

export default LayoutPage;
