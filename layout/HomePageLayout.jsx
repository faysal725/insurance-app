import React from "react";
import HomePageSlider from "../components/HomePage/HomePageSlider";
import ProductContainer from "../hoc/ProductContainer";
import DefaultLayout from "./DefaultLayout";

function HomePageLayout({ children, pageTitle }) {
  return (
    <DefaultLayout pageTitle={pageTitle}>
      <div className="home-page">
        <ProductContainer>{children}</ProductContainer>
      </div>
    </DefaultLayout>
  );
}

export default HomePageLayout;
