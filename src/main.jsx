import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/Route.jsx";
import { SnackbarProvider } from "notistack";
import AuthProvider from "./providers/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SnackbarProvider>
          <RouterProvider router={Route} />
        </SnackbarProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
