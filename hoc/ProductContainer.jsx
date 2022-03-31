import { Container } from "@mui/material";
import { useState } from "react";
import ProductCard from "../components/HomePage/ProductCard";

function ProductContainer({ children }) {
  const [insuranceList] = useState([
    {
      title: "Motor Insurance",
      image: "./images/motor_insurance.png",
      url: "/motor-insurance",
    },
    {
      title: "Travel Insurance",
      image: "./images/travel_insurance.png",
      url: "/travel-insurance",
    },
    {
      title: "Health Plan",
      image: "./images/health_plan.png",
      url: "/health-plan",
    },
    {
      title: "Personal Accident",
      image: "./images/personal_accident.png",
      url: "/personal-plan",
    },
    {
      title: "Bangabondhu Surakkha",
      image: "./images/bangabondhu_surakkha.png",
      url: "/bangabondhu-surakkha",
    },
  ]);

  return (
    
    <Container maxWidth="lg" className="product-container">
        <div className="product-card-container">
          {insuranceList.map((data) => (
            <ProductCard key={data.title} {...data} />
          ))}
        </div>
        {children}
    </Container>
  );
}

export default ProductContainer;
