import { Route, Routes } from "react-router-dom";
import Products from "./pages/Products";
import Product from "./pages/Product";

function App() {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route
        path="/product/:slug"
        element={<Product />}
      />
      {/* In loc de id, folosim slug pt ca asa am denumit in Sanity */}
      <Route path="/success" element={<h1>Success!</h1>}/>
      <Route path="/canceled"element={<h1>We are sorry to see you go</h1>}/>
      <Route
        path="/*"
        element={<h1>Not found</h1>}
      />
      {/* React router incearca sa faca match la URL-ul introdus si daca nu este definit intr-una din rute, ne afiseaza "Not found" */}
      
    </Routes>
  );
}

export default App;
