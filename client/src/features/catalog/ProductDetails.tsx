import { LoadingButton } from "@mui/lab";
import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Notfound from "../../app/errors/NotFound";
import LoadingComponnent from "../../app/layout/LoadingComponent";
import { currencyFormat } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../contacts/configureStore";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { basket, status } = useAppSelector(state => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams <{id: string}> ();
  const product = useAppSelector(state => productSelectors.selectById(state, id));
  const { status: productStatus } = useAppSelector(state => state.catalog);
  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find(i => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (id) {
      if(!product) dispatch(fetchProductAsync(parseInt(id)))
    }
  }, [id, item, dispatch, product]);
  
  function handleInputChange(event: any) {
    if (event.target.value >= 0) {
      setQuantity(event.target.value);
    }
  }

  function handleUpdateCart() {
    if (quantity === 0 && item) {
      dispatch(removeBasketItemAsync({productId: product?.id!, quantity: quantity}))
    } else
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;

      dispatch(addBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
    } else {
      const updatedQuantity = item.quantity - quantity;

      dispatch(removeBasketItemAsync({productId: product?.id!, quantity: updatedQuantity}))
    }
  }

  if (productStatus.includes('pending')) return <LoadingComponnent message='Loading Product Details...' />
  
  if (!product) return <Notfound />

  return(
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
      </Grid>
      <Grid item xs={6} >
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography variant='h3' color='secondary'>{currencyFormat(product.price)}</Typography>
        <TableContainer>
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
        </TableContainer>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant='outlined'
              type='number'
              label='Quantity in Cart'
              fullWidth
              onChange={handleInputChange}
              value={quantity}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={item?.quantity === quantity || (!item && quantity === 0) } //suspect logic!!! need to cleanup
              loading={status.includes('pending')}
              sx={{ height: '55px' }}
              color='primary'
              size='large'
              variant='contained'
              fullWidth
              onClick={handleUpdateCart}
            >
              {item ? 'Update Quantity' : 'Add to Cart' }
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}