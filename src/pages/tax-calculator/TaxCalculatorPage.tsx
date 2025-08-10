import React from "react";
import TextInput from "../../components/TextInput";

const TaxCalculatorPage: React.FC = () => {
  // Defaults tax brackets from UK GOV 2025/26
  const personalAllowance: number = 12570;
  const firstBracketThreshold: number = 50270;
  const firstBracketRate: number = 0.2;
  const secondBracketThreshold: number = 125140;
  const secondBracketRate: number = 0.4;
  const thirdBracketRate: number = 0.45;


  // Total income and business expenses within the tax year
  const [totalIncome, setTotalIncome] = React.useState<number>(0);
  const [totalExpenses, setTotalExpenses] = React.useState<number>(0);

  // TODO: dropdown to help with calculation of specific expenses
  // // Calculation of rent allowance for self employed who work at home
  // const [hoursWorked, setHoursWorked] = React.useState<number>(0);
  // const [totalRentCost, setTotalRentCost] = React.useState<number>(0);
  // const rentAllowance = totalRentCost * (hoursWorked / (24*365)); // TODO: is percentage of house? 

  // // Calculation of equipment allowance for self employed who bought equipment for work
  // const [equipmentAllowance, setEquipmentAllowance] = React.useState<number>(0); // TODO: convert to list

  // // TODO: ["your first £1,000 of income from self-employment - this is your ‘trading allowance’"]
  // const [tradingAllowance, setTradingAllowance] = React.useState<number>(1000);

  // The amount of income that is taxable
  var taxableAmount: number = totalIncome - totalExpenses;

  // // TODO: Whether to pay optional Class 2 NIC for income <= £6725
  // const [showOptionalClassTwoNic, setShowOptionalClassTwoNic] = React.useState<boolean>(false);
  const [optionalClassTwoNic, setOptionalClassTwoNic] = React.useState<boolean>(false);

  // Get the total tax due, based on UK GOV tax brackets 2025/26
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

  // NIC contributions due, including Class 4 NIC and Class 2 NIC
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
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row w-full text-4xl pb-10">
          Self-employed tax calculator 24/25
        </div>
        <div className="flex flex-row w-full justify-start">
          <div className="flex flex-1">
            Total income:
          </div>
          <div className="flex flex-1">
            <TextInput inputValue={totalIncome} setInputValue={setTotalIncome}/>
          </div>
          <div className="flex flex-2">
            <input 
              className="w-full placeholder:text-gray-400 text-black px-2 py-0.5 rounded-md outline-1 outline-gray-300 focus:outline-sky-300"
              placeholder="Enter additional notes or income breakdown"
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-start items-center">
          <div className="flex flex-1">
            Total business expenses:
          </div>
          <div className="flex flex-1">
            <TextInput inputValue={totalExpenses} setInputValue={setTotalExpenses}/>
          </div>
          <div className="flex flex-2">
            <input 
              className="w-full placeholder:text-gray-400 text-black px-2 py-0.5 rounded-md outline-1 outline-gray-300 focus:outline-sky-300"
              placeholder="Enter additional notes or expense breakdown"
            />
          </div>
        </div>
        <div className="flex flex-row w-full justify-start">
          <div className="flex flex-1">
            Taxable amount:
          </div>
          <div className="flex flex-3">
            £{taxableAmount}
          </div>
        </div>
        <div className="flex flex-row w-full justify-start">
          <div className="flex flex-1">
            Tax due:
          </div>
          <div className="flex flex-3">
            £{Math.round(_getTaxDue() * 100) / 100}
          </div>
        </div>
        <div className="flex flex-row w-full justify-start">
          <div className="flex flex-1">
            NIC due:
          </div>
          <div className="flex flex-3">
            £{Math.round(_getNicDue() * 100) / 100}
          </div>
        </div>
        <div className="flex flex-row w-full justify-start">
          <div className="flex flex-1">
            Total due:
          </div>
          <div className="flex flex-3">
            £{Math.round((_getTaxDue() + _getNicDue()) * 100) / 100}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TaxCalculatorPage