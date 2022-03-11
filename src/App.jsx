import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AppRoute from "./routes/AppRoute";
import Footer from "./components/Footer/Footer";
// import TokenExchangeCard from "./components/TokenExchange/TokenExchangeCard";

function App() {
  return (
    <div className="bg-mb-offWhite min-h-screen">
      <Navbar />

      {/* Routes */}
      <AppRoute />

      <Footer />
    </div>
  );
}

export default App;
