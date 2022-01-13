import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { useEffect, useState } from 'react';
import {
  Route, Switch,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

import AboutPage from '../../features/about/AboutPage';
import Catalog from '../../features/catalog/Catalog';
import ProductDetails from '../../features/catalog/ProductDetails';
import ContactPage from '../../features/contacts/ContactPage';
import HomePage from '../../features/home/HomePage';
import Header from './Header';
import 'react-toastify/dist/ReactToastify.css'
import ServerError from '../errors/ServerError';
import Notfound from '../errors/NotFound';
import BasketPage from '../../features/basket/BasketPage';
import { getCookie } from '../util/util';
import agent from '../API/agent';
import LoadingComponnent from './LoadingComponent';
import CheckoutPage from '../../features/checkout/CheckoutPage';
import { useAppDispatch } from '../../features/contacts/configureStore';
import { setBasket } from '../../features/basket/basketSlice';

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const buyerId = getCookie('buyerId');
    if (buyerId) {
      agent.Basket.get()
        .then(basket => dispatch(setBasket(basket)))
        .catch(error => console.log(error))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [dispatch]);

  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light';

  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea': '#040404'
      }
    }
  })

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }
 
  if(loading) return <LoadingComponnent message="Initializing App..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position='bottom-right' hideProgressBar/>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/catalog/:id" component={ProductDetails} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/server-error" component={ServerError} />
          <Route exact path='/basket' component={BasketPage} />
          <Route exact path='/checkout' component={CheckoutPage} />
          <Route component={Notfound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;
