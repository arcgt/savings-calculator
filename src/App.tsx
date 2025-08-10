import { BrowserRouter, Routes, Route } from "react-router";
import SavingsCalculator from "./pages/savings-calculator/SavingsCalculator";
import Layout from "./components/Layout";
import TaxCalculatorPage from "./pages/tax-calculator/TaxCalculatorPage";

function App() {
  return (
    <>
     <BrowserRouter basename={"/savings-calculator/"}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<SavingsCalculator />} />
            <Route path="tax-calculator" element={<TaxCalculatorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App