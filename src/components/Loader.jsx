import { loader } from '../assets';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex h-screen flex-col items-center justify-center bg-black bg-opacity-70">
      <img src={loader} alt="Loading..." className="h-[100px] w-[100px] object-contain" />
      <p className="mt-5 text-center font-epilogue text-xl font-bold text-white">
        Transaction in progress
        <br />
        Please wait...
      </p>
    </div>
  );
};

export default Loader;