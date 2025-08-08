import React from "react";

const SavingsCalculator: React.FC = () => {
  React.useEffect(() => {
    document.documentElement.scrollTo({top: 0, behavior: "instant"});
  }, []);
  
  return (
    <section className='flex flex-col mt-20 w-screen justify-start text-black p-20'>
      <div>
        Savings Calculator (WIP)
      </div>
    </section>
  )
}

export default SavingsCalculator