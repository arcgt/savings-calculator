import React from "react";

const TaxCalculatorPage: React.FC = () => {
  // --------------------------------------------------------------
  // --------------------------- INCOME ---------------------------
  // --------------------------------------------------------------
  const [totalIncome, setTotalIncome] = React.useState<number>(0);

  // --------------------------------------------------------------
  // -------------------------- BRACKETS --------------------------
  // --------------------------------------------------------------

  // Defaults based on UK Gov tax brackets 2025/26
  const [personalAllowance, setPersonalAllowance] = React.useState<number>(12570);
  const [firstBracketThreshold, setFirstBracketThreshold] = React.useState<number>(50270);
  const [firstBracketRate, setFirstBracketRate] = React.useState<number>(0.2);
  const [secondBracketThreshold, setSecondBracketThreshold] = React.useState<number>(125140);
  const [secondBracketRate, setSecondBracketRate] = React.useState<number>(0.4);
  const [thirdBracketRate, setThirdBracketRate] = React.useState<number>(0.45);

  // --------------------------------------------------------------
  // ------------------------- ALLOWANCES -------------------------
  // --------------------------------------------------------------

  // Calculation of rent allowance for self employed who work at home
  const [hoursWorked, setHoursWorked] = React.useState<number>(0);
  const [totalRentCost, setTotalRentCost] = React.useState<number>(0);
  const rentAllowance = totalRentCost * (hoursWorked / (24*365)); // TODO: is percentage of house? 

  // Calculation of equipment allowance for self employed who bought equipment for work
  const [equipmentAllowance, setEquipmentAllowance] = React.useState<number>(0); // TODO: convert to list

  // // TODO: ["your first £1,000 of income from self-employment - this is your ‘trading allowance’"]
  // const [tradingAllowance, setTradingAllowance] = React.useState<number>(1000);

  // --------------------------------------------------------------
  // ----------------------- TAXABLE AMOUNT -----------------------
  // --------------------------------------------------------------

  // The amount of income that is taxable
  var taxableAmount = totalIncome - rentAllowance - equipmentAllowance;

  // Personal allowance is fixed based on UK Gov for the year 2025/26
  const [optionalClassTwoNic, setOptionalClassTwoNic] = React.useState<boolean>(false);

  // Get the total tax due, based on UK Gov tax brackets 2025/26
  const _getTaxDue = () => {
    if (taxableAmount <= personalAllowance) {
      return 0;
    } else if (taxableAmount <= firstBracketThreshold) {
      return (taxableAmount - personalAllowance) * firstBracketRate;
    } else if (taxableAmount <= secondBracketThreshold) {
      return (taxableAmount - firstBracketThreshold) * secondBracketRate + (firstBracketThreshold - personalAllowance) * firstBracketRate;
    } else {
      return (taxableAmount - secondBracketThreshold) * thirdBracketRate + (secondBracketThreshold - firstBracketThreshold) * secondBracketRate + (firstBracketThreshold - personalAllowance) * firstBracketRate;
    }
  }

  // NIC contributions, including Class 4 NIC and Class 2 NIC
  const _getNicDue = () => {
    if (taxableAmount <= 6725) {
      if (optionalClassTwoNic) {
        // The Class 2 rate for tax year 2024/2025 is £3.45 a week.
        return 3.45 * 52.1429;
      } else {
        return 0;
      }
    } else if (taxableAmount <= personalAllowance) {
      // Class 2 contributions are treated as having been paid to protect your National Insurance record. This means you do not have to pay Class 2 contributions.
      return 0;
    } else if (taxableAmount <= firstBracketThreshold) {
      // If your profits are more than £12,570 a year, you must pay Class 4 contributions.
      // 6% on profits of £12,570 up to £50,270
      return (taxableAmount - personalAllowance) * 0.06;
    } else {
      // 2% on profits over £50,270
      return (taxableAmount - firstBracketThreshold) * 0.02 + (firstBracketThreshold - personalAllowance) * 0.06;
    }
  }

  // Note: *first payment on account for the next year (25/26) must be paid if total tax (24/25)  is > £1000

  React.useEffect(() => {
    document.documentElement.scrollTo({top: 0, behavior: "instant"});
  }, []);
  
  return (
    <section className='flex flex-col mt-20 w-screen justify-start items-start text-black p-20'>
      <div className="flex flex-row w-full text-4xl pb-10">
        Self-employed tax calculator
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          Total income:
        </div>
        <div className="flex flex-1">
          xxx
        </div>
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          Hours worked:
        </div>
        <div className="flex flex-1">
          xxx
        </div>
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          Rent paid:
        </div>
        <div className="flex flex-1">
          xxx
        </div>
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          Equipment cost:
        </div>
        <div className="flex flex-1">
          xxx
        </div>
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          Taxable amount:
        </div>
        <div className="flex flex-1">
          {taxableAmount}
        </div>
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          Tax due:
        </div>
        <div className="flex flex-1">
          {_getTaxDue()}
        </div>
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          NIC due:
        </div>
        <div className="flex flex-1">
          {_getNicDue()}
        </div>
      </div>
      <div className="flex flex-row w-full justify-start">
        <div className="flex flex-1">
          Total due:
        </div>
        <div className="flex flex-1">
          {_getTaxDue() + _getNicDue()}
        </div>
      </div>
    </section>
  )
}

export default TaxCalculatorPage