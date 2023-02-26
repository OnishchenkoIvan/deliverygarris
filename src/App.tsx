import React from "react";
import "./scss/app.scss";
import { Home } from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { Cart } from "./pages/Cart/Cart";
import { FullPizza } from "./pages/FullPizza/FullPizza";
import { MainLayout } from "./layouts/MainLayout";

export function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
