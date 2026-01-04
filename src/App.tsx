import Search from "./pages/Search/Search";
import { BrowserRouter } from "react-router-dom";
import PaymentPage from "./components/checkout/PaymentPage";

const App = () => {
  return (
    <BrowserRouter>
      <Search /> 
      <PaymentPage />
    </BrowserRouter>
  );
};

export default App;

