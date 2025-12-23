// import React from "react";
import TaxCalculator from "./components/TaxCalculator";
// import StandardDeductionsTable from "./components/StandardDeductionsTable";

export default function App() {
  return (
    <div className="container mt-5">
      <h1>Tax Calculator</h1>
      <hr className="my-4" />

      <TaxCalculator />
    </div>
  );
}
