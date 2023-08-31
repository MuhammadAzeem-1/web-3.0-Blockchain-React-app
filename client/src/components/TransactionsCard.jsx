import React from "react";
import useFetch from "../hooks/useFetch";
import { ShortAddress } from "../utils/ShortAddress";

const TransactionCard = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  keyword,
  amount,
  url,
}) => {
  const Gifs = useFetch({ keyword });
  return (
    <div className="bg-[#181918] m-4 flex flex-1 2xl:min-w-[450px] 2xl:max-w-[500px] sm: min-w-[270p sm:max-w-[300px] flex-col p-3 rounded-md hover:shadow-2xl">
      <div className="flex flex-col items-center w-full mt-3">
        <div className="flex flex-col justify-start w-full mb-6 p-2">
          <a
            href={`https://ropsten.etherscan.io/address/${addressFrom}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              From : {ShortAddress(addressFrom)}
            </p>
          </a>
          <a
            href={`https://ropsten.etherscan.io/address/${addressTo}`}
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-white text-base">
              To : {ShortAddress(addressTo)}
            </p>
          </a>
          <p className="text-white text-base">amount : {amount} ETH</p>
          {message && (
            <>
              <p className="text-white text-base">message : {message}</p>
            </>
          )}
          <img src={Gifs || url} alt="" className="w-full h-68" />
          <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
            <p className="text-[#37c7da] font-bold">{timestamp}</p>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
