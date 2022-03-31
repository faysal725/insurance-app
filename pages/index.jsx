import Head from "next/head";
import Header from "../components/Header";
import HomePageSlider from "../components/HomePage/HomePageSlider";
import ProductContainer from "../hoc/ProductContainer";
import DefaultLayout from "../layout/DefaultLayout";
import HomePageLayout from "../layout/HomePageLayout";

export default function Home() {
  return (
    <HomePageLayout activeItem="" pageTitle="Home Page">
      <div className="landing-page">
        <p className="quote">
          “When you need Authentic & Comprehensive Information on Insurance Plus
          Real Experience, Real Insight, Personalized Services, and Pragmatic
          Solutions……That’s the time, you need RELIANCE INSURANCE LIMITED!”
        </p>
        <section>
          <h2 className="section-title">Motor Insurance</h2>
          <p className="section-description">
            Different Motor Policies issued for different types of motor
            vehicles. Motor Vehicles are usually classified in the following
            manner:
          </p>
          <h3 className="section-point">A. Private Vehicles:</h3>
          <p className="point-description">
            The vehicles which are under private Registration and used for
            private purposes and not used for hire or reward, shall come under
            the scope of the Private Vehicles. The vehicles are classed on the
            basis of the registration and the purposes of use but not on the
            basis of the design or type.
          </p>
          <h3 className="section-point">B. Commercial Vehicles</h3>
          <p className="point-description">
            All vehicles not provided for under the Private or Motor Cycle
            Tariff excluding vehicles running on rails.
          </p>
        </section>
        <section>
          <h2 className="section-title">Travel Insurance</h2>
          <p className="section-description">
            Overseas Travel Insurance protects you against accidental injury or
            sudden sickness while traveling overseas for Business, Holidays,
            Studies and Employment.
          </p>
        </section>
        <section>
          <h2 className="section-title">Health Insurance</h2>
          <p className="section-description">
            The Health Insurance covers expenses of medical treatment while
            hospitalized due to illness or injury. Each confinement in broad
            terms includes:
          </p>
          <ul>
            <li>Hospital Accommodation</li>
            <li>Consultation with Physician or Surgeon</li>
            <li>Medical Investigations</li>
            <li>Surgical Operation (major and intermediate)</li>
            <li>Use of Operation Theatre facilities, anesthesia, and other services.</li>
            <li>Medicines</li>
            <li>Ancillary services like labour room services, ICU/CCU room, post-operative room, blood transfusion, ambulance service etc.</li>
          </ul>
        </section>
      </div>
    </HomePageLayout>
  );
}
