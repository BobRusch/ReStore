import { Divider, Grid, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import agent from "../../app/API/agent";
import Notfound from "../../app/errors/NotFound";
import LoadingComponnent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/products";

export default function ProductDetails() {
  const { id } = useParams <{id: string}> ();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    if (id) {
      agent.Catalog.details(parseInt(id))
        .then(response => setProduct(response))
        .catch(err => console.log(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <LoadingComponnent message='Loading Product Details...'/>
  if (!product) return <Notfound />

  return(
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
      </Grid>
      <Grid item xs={6} >
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography variant='h3' color='secondary'>${(product.price/100).toFixed(2)}</Typography>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{product.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>{product.description}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>{product.type}</TableCell>
            </TableRow>
             <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>{product.brand}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Quantity On Hand</TableCell>
              <TableCell>{product.quantityInStock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}