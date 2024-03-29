import '@mantine/core/styles.css';

import {MantineProvider, createTheme} from '@mantine/core';
import './App.css';

export default function App() {
  const theme = createTheme({
    /** Your theme override here */
  });

  return <MantineProvider theme={theme}>
    {/* TODO */}
  </MantineProvider>
}
