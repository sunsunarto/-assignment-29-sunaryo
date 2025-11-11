import React from "react";
import "antd/dist/reset.css";
import "./globals.css"; 
import { ConfigProvider } from "antd";

function MyApp({ Component, pageProps }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      <Component {...pageProps} />
    </ConfigProvider>
  );
}

export default MyApp;
