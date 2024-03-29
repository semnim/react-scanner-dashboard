import '@mantine/core/styles.css';
import './App.css';

import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {MantineProvider, createTheme} from '@mantine/core';

import {LandingPage} from "pages/LandingPage.tsx";
import {ReportPage} from "pages/ReportPage.tsx";

export default function App() {
  const theme = createTheme({
    /** Your theme override here */
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage/>,
    },
    {
      path: "/report",
      element: <ReportPage/>,
    },
  ]);

  return (
      <MantineProvider theme={theme}>
        <RouterProvider router={router}/>
      </MantineProvider>
  );
}
