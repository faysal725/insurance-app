import Head from "next/head";
import Header from "../components/Header";
import HomePageSlider from "../components/HomePage/HomePageSlider";

function DefaultLayout({ children, pageTitle }) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <Header />
      <HomePageSlider />
      {children}
    </>
  );
}

export default DefaultLayout;
