import { BrowserRouter, Routes, Route } from "react-router";
import HomePage from "./pages/home/HomePage";
import Layout from "./components/Layout";
import TaxCalculatorPage from "./pages/tax-calculator/TaxCalculatorPage";
import AccountComparisonsPage from "./pages/account-comparisons/AccountComparisonsPage";

function App() {
  return (
    <>
     <BrowserRouter basename={"/savings-calculator/"}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="tax-calculator" element={<TaxCalculatorPage />} />
            <Route path="savings-account-comparisons" element={<AccountComparisonsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App