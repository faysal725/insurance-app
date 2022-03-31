import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function ProductCard({ title, image, url }) {
  const {pathname} = useRouter();
  return (
    <Link href={url}>
      <a
        className={
          pathname=== url ? "product-card selected" : "product-card"
        }
      >
        <div className="product-image">
          <img src={image} alt={title} />
        </div>
        <h4 className="product-title">{title}</h4>
      </a>
    </Link>
  );
}

export default ProductCard;
