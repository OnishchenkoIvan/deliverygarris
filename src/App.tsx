import React from "react";
import "./scss/app.scss";
import { Header } from "./components/Header/Header";
import { Home } from "./pages/Home/Home";
import { Route, Routes } from "react-router-dom";
import { NotFound } from "./pages/NotFound/NotFound";
import { Cart } from "./pages/Cart/Cart";

type SearchValueType = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};
export const SearchContext = React.createContext({} as SearchValueType);
export function App() {
  const [searchValue, setSearchValue] = React.useState("");

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}
