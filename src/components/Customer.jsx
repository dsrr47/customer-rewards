import { useState, useEffect } from "react";
import Transactions from "./Transactions";

// Calculate reward per purchase
const calculateReward = (amount) => {
  let reward = 0;
  amount = Math.floor(amount);
  if (amount < 50) {
    reward = 0;
  }
  if (amount <= 100 && amount > 50) {
    reward = amount - 50;
  }
  if (amount > 100) {
    reward = (amount - 100) * 2;
    reward += 50;
  }
  return reward;
};

// Calculate Total Rewards
const calculateTotalRewards = (arr, fn) => {
  let rewards = [];
  arr.map((num) => rewards.push(fn(num.amount)));
  return rewards.reduce((acc, num) => acc + num, 0);
};

export default function Customer({ name, email, transactions }) {
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    const today = new Date();
    const cutoffDate = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000);

    const newTransactions = transactions.filter((item) => {
      const itemDate = new Date(item.date);
      return itemDate >= cutoffDate;
    });
    setFilteredTransactions(newTransactions);
  }, [transactions]);

  return (
    <div className="bg-white rounded shadow mb-5 p-4 w-6/12">
      <div className="flex justify-between items-center w-full pb-2 border-b">
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold tracking-wide text-gray-900">
            {name}
          </h3>
          <p className="text-sm text-cyan-600 flex items-center">{email}</p>
        </div>
        <h2 className="flex items-center text-xl text-cyan-800 font-bold">
          Total Rewards:{" "}
          {calculateTotalRewards(filteredTransactions, calculateReward)}
        </h2>
      </div>
      <div className="w-full">
        <Transactions
          transactions={transactions}
          key={transactions.id}
          name={name}
          calculateReward={calculateReward}
          calculateTotalRewards={calculateTotalRewards}
        />
      </div>
    </div>
  );
}
