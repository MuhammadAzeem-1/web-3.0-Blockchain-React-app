import React from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";

const Slides = ({ title, subTitle, icon, color }) => (
  <div
    className={`flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl`}
  >
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}  `}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subTitle}</p>
    </div>
  </div>
);

const Services = () => {
  return (
    <section className="flex w-full justify-center items-center gradient-bg-services">
      <div className="flex md:flex-row flex-col justify-around align-center md:p-20 ">
        <div className="flex-1">
          <h1 className=" text-3xl font-medium capitalize tracking-wide leading-[50px]  text-gradient sm:text-5xl">
            Services that we
            <br />
            continue to improve
          </h1>
          <p className="text-white leading-[29px] text-12 capitalize tracking-wide py-[20px] md:w-9/12 w-11/12">
            The best choice for buying and selling your crypto assets, with the
            various super friendly services we offer
          </p>
        </div>
        <div className="flex flex-1 flex-col w-[32rem] justify-start items-center  ">
          <Slides
            title="Security gurantee"
            subTitle=" Security is guranteed. We always maintain privacy and maintain the quality of our products"
            color="bg-[#2952E3]"
            icon={<BsShieldFillCheck />}
          />
          <Slides
            title="Best exchange rates"
            subTitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
            color="bg-[#8945F8]"
            icon={<BiSearchAlt />}
          />
          <Slides
            title="Fastest transactions"
            subTitle=" Security is guranteed. We always maintain privacy and maintain the quality of our products"
            color="bg-[#F84550]"
            icon={<RiHeart2Fill />}
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
