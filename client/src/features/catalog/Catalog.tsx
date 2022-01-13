import { useState, useEffect } from "react";
import agent from "../../app/API/agent";
import LoadingComponnent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/products";
import ProductList from "./ProductList";


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    agent.Catalog.list()
      .then(products => setProducts(products))
      .catch(error => console.log(error))
      .finally(()=>setLoading(false))
  }, []);

  if (loading) return <LoadingComponnent message='Loading Products...' />
  
  return (
    <ProductList products={products} />
  );
}