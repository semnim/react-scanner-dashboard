import '@mantine/core/styles.css';

import {RouterProvider, createBrowserRouter} from "react-router-dom";
import {MantineProvider, createTheme} from '@mantine/core';

import {LandingPage} from "pages/landing/LandingPage.tsx";
import {ReportPage} from "pages/report/ReportPage.tsx";

import twConfig from '../tailwind.config.js'


export default function App() {

  const {theme: {extend: {colors}}} = twConfig;

  const theme = createTheme({
        components: {
          Text: {
            defaultProps: {
              size: "xl",
            },
          },
          Loader: {
            defaultProps: {
              size: "xl",
              variant: "dots",
              color: colors.faint,
            },
          },
          Button: {
            defaultProps: {
              variant: "filled",
            },
            classNames: {
              root: "text-offwhite rounded-3xl",
            }
          },
          ActionIcon: {
            defaultProps: {
              variant: "transparent",
              color: colors.offwhite,
            },
            classNames: {
              root: "hover:text-gray-400 disabled:text-gray-400 disabled:bg-transparent",
            }
          },
          Affix: {
            classNames: {
              root: "bg-black rounded-lg",
            },
          },
          Select: {
            defaultProps: {
              variant: "unstyled",
            },
            classNames: {
              input: "border-1 border-gray-300 focus:border-gray-300 text-offwhite pl-3",
              option: "hover:text-black",
              dropdown: "bg-primary text-offwhite",
            }
          },
          Title: {
            defaultProps: {
              order: 1,
            },
            classNames: {
              root: "text-7xl",
            },
          },
          Dropzone: {
            classNames: {
              root: "rounded-lg text-offwhite transition duration-200",
            }
          },
          Modal: {
            classNames: {
              content: "bg-primary text-offwhite border-error border border-1 border-solid",
            }
          },
          Accordion: {
            classNames: {
              root: "bg-primary text-offwhite",
              control: "border-1 hover:bg-primary text-offwhite",
            }
          },
        }
      }
  );

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
