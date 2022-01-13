import { Container, createTheme, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/system';
import { useState } from 'react';

import Catalog from '../../features/catalog/Catalog';
import Header from './Header';

function App() {
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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container >
        <Catalog />
      </Container>
    </ThemeProvider>
  );
}

export default App;
