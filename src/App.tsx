import { BrowserRouter, Routes, Route } from "react-router";
import SavingsCalculator from "./pages/savings-calculator/SavingsCalculator";
import Layout from "./components/Layout";
import TaxCalculatorPage from "./pages/tax-calculator/TaxCalculatorPage";
import AccountComparisonsPage from "./pages/account-comparisons/AccountComparisonsPage";

function App() {
  return (
    <>
     <BrowserRouter basename={"/savings-calculator/"}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SavingsCalculator />} />
            <Route path="tax-calculator" element={<TaxCalculatorPage />} />
            <Route path="savings-account-comparisons" element={<AccountComparisonsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App