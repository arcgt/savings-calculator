import { Link } from "react-router";

const NavigationBar: React.FC = () => {

  return (
    <>
      <nav className='flex flex-row fixed top-0 left-0 z-[10] h-20 gap-16 w-full items-center justify-center bg-white shadow-md'>
        <Link to="/"><p className='text-black'>Savings Calculator</p></Link>
        <Link to="/tax-calculator"><p className='text-black'>Tax Calculator</p></Link>
      </nav>
    </>
  );
};

export default NavigationBar;