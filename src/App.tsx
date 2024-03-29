import {MantineProvider, createTheme} from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css';
import {LandingPage} from "pages/LandingPage.tsx";
import {RouterProvider, createBrowserRouter} from "react-router-dom";

export default function App() {
  const theme = createTheme({
    /** Your theme override here */
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>,
    },
  ]);

  return (
      <MantineProvider theme={theme}>
        <RouterProvider router={router}/>
      </MantineProvider>
  );
}
