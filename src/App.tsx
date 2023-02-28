import React from "react";
import "./scss/app.scss";
import { Home } from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";

const Cart = React.lazy(() => import("./pages/Cart/Cart"));
const FullPizza = React.lazy(() => import("./pages/FullPizza/FullPizza"));
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));
export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </React.Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <React.Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
