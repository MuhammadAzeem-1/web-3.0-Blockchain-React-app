import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";
import { parseEther } from "ethers/lib/utils";

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();
  const [isLoading, setIsloading] = useState(false);
  const [transaction, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    addressTo: "",
    amount: "",
    keyword: "",
    message: "",
  });
  const [transactionsCount, setTransactionsCount] = useState(
    localStorage.getItem("transactions")
  );

  const handleChange = (e, name) => {
    setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const transactionsContract = getEthereumContract();

      const avilableTranstions =
        await transactionsContract.getAllTransactions();

      const structuredTransaction = avilableTranstions.map((transaction) => ({
        addressTo: transaction.receiver,
        addressFrom: transaction.sender,
        timestamp: new Date(
          transaction.timestamp.toNumber() * 1000
        ).toLocaleString(),
        message: transaction.message,
        keyword: transaction.keyword,
        amount: parseInt(transaction.amount._hex) / 10 ** 18,
      }));

      console.log(structuredTransaction);
      setTransactions(structuredTransaction);
    } catch (error) {}
  };

  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }

      getAllTransactions();
      console.log(accounts);
    } catch (error) {
      console.log(error);
      throw new Error("etherum object not found");
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      const transactionsContract = getEthereumContract();
      const transactionCurrentContract =
        await transactionsContract.getTransactionsCount();

      window.localStorage.setItem(
        "transactionCount",
        transactionCurrentContract
      );
    } catch (error) {
      console.log(error);
      throw new Error("etherum object not found");
    }
  };

  const sendTransactions = async () => {
    try {
      // code for transactions
      if (!ethereum) return alert("Please install metamask");
      const { addressTo, amount, keyword, message } = formData;
      const transactionsContract = getEthereumContract();
      const parsedAmount = ethers.utils.parseEther(amount);

      await ethereum.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: currentAccount,
            to: addressTo,
            gas: "0x5208",
            value: parsedAmount._hex,
          },
        ],
      });

      const transactionsHash = await transactionsContract.addToBlockchain(
        addressTo,
        parsedAmount,
        message,
        keyword
      );

      setIsloading(true);
      console.log(`loading - ${transactionsHash.hash}`);
      await transactionsHash.wait();
      setIsloading(false);
      console.log(`Success - ${transactionsHash.hash}`);

      const transactionsCount =
        await transactionsContract.getTransactionsCount();

      setTransactionsCount(transactionsCount.toNumber());

      window.reload();
    } catch (error) {
      console.log(error);
      throw new Error("etherum object not found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install metamask");
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("etherum object not found");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    checkIfTransactionsExists();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        handleChange,
        formData,
        sendTransactions,
        transaction,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
