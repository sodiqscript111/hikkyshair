import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import CheckoutPage from "./pages/Cheakout";
import ShopAllPage from "./pages/ShopAllPage";
import CollectionPage from "./pages/CollectionPage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./CartContext";

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout/:id" element={<CheckoutPage />} />
        <Route path="/shop-all" element={<ShopAllPage />} />
        <Route path="/collection/:collectionSlug" element={<CollectionPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </CartProvider>
  );
}

export default App;