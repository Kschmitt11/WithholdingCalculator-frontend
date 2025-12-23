import { useState } from "react";
import type { TaxResponse } from "../types";

export default function TaxCalculator() {
  // State for user inputs
  const [filingStatus, setFilingStatus] = useState("single");
  const [grossIncome, setGrossIncome] = useState("");
  // State for result
  const [taxes, setTaxes] = useState<number | null>(null);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    handleCalculateTaxes();
  }
  // Function to call Flask API
  const handleCalculateTaxes = async () => {
    if (!filingStatus || !grossIncome) return;

    try {
      const response = await fetch("http://127.0.0.1:5000/api/gross_income", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filing_status: filingStatus,
          income: parseFloat(grossIncome),
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        alert(`Error: ${errData.error}`);
        return;
      }

      const data: TaxResponse = await response.json();
      setTaxes(data.taxes_owed);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch taxes from server.");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Filing Status:</label>
          <select
            className="form-select"
            value={filingStatus}
            onChange={(e) => setFilingStatus(e.target.value)}
          >
            <option value="single">Single</option>
            <option value="mfj">Married Filing Jointly (MFJ)</option>
            <option value="hoh">Head of Household (HOH)</option>
          </select>
        </div>

        <div className="mb-3">
          <label>Gross Income:</label>

          <input
            type="number"
            className="form-control"
            value={grossIncome}
            onChange={(e) => setGrossIncome(e.target.value)}
            placeholder="Enter annual gross income"
          />
        </div>

        <button className="btn btn-primary" onClick={handleCalculateTaxes}>
          Calculate Taxes
        </button>
      </form>

      {taxes !== null && (
        <div className="mt-4">
          <h4>Taxes Owed: ${taxes}</h4>
        </div>
      )}
    </div>
  );
}
