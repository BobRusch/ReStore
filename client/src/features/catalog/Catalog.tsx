import { useEffect } from "react";
import LoadingComponnent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../contacts/configureStore";
import { fetchProductsAsync, productSelectors } from "./catalogSlice";
import ProductList from "./ProductList";


export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, status } = useAppSelector(state => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  if (status.includes('pending')) return <LoadingComponnent message='Loading Products...'/>

  return (
    <ProductList products={products} />
  );
  }