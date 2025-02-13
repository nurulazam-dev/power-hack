import { useContext } from "react";
import dataImg from "../../../assets/images/data-trends.svg";
import { MdArrowOutward } from "react-icons/md";
import { authContext } from "../../../context/AuthContext";

const OverviewUserBanner = () => {
  const { user, role } = useContext(authContext);

  return (
    <section className="bg-gradient-to-r from-violet-800 to-violet-300 text-white rounded-md mb-6">
      <div className="lg:flex justify-between items-center p-2 pb-0">
        {/* info part */}
        <div className="px-4 lg:pb-0 pb-3">
          <h2 className="font-bold lg:text-2xl text-xl mb-2">
            Hello! {user?.name}{" "}
            <span className="text-sm font-semibold">({role})</span>
          </h2>
          <p className="opacity-85 font-thin text-[14px] lg:text-[15px]">
            Dive into your personalized dashboard for seamless management and
            insights. Thanks for being part of our team!
          </p>
          <button className="bg-black hover:bg-white py-[5px] lg:py-[7px] rounded font-normal text-[15px] lg:text-[17px] mt-4 lg:mb-2 text-white hover:text-black flex justify-center items-center px-5">
            Profile <MdArrowOutward className="h-5 w-5 ml-1" />
          </button>
        </div>
        {/* img part */}
        <div className="mt-4 lg:block hidden">
          <img src={dataImg} alt="" className="max-w-64" />
        </div>
      </div>
    </section>
  );
};

export default OverviewUserBanner;
