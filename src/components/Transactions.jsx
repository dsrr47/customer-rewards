import React, { useState, useEffect } from "react";
import MonthlyTransactions from "./MonthlyTransactions";

const sortTransactions = (transactions) => {
  const currentDate = new Date();
  const cutoffDate = new Date(currentDate.getTime() - 90 * 24 * 60 * 60 * 1000);
  // copy transactions
  const newTransactions = [...transactions];

  // sort transactions into arrays by month
  const newTransactionByMonth = newTransactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    // check if transaction is less than 90 days push it to object
    if (date >= cutoffDate) {
      const monthName = new Date(transaction.date).toLocaleString("default", {
        month: "long",
      });
      acc[monthName] = acc[monthName] || [];
      acc[monthName].push(transaction);
      acc[monthName].sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    return acc;
  }, {});
  return newTransactionByMonth;
};

export default function Transactions({
  transactions,
  calculateReward,
  calculateTotalRewards,
}) {
  const [transactionsByMonth, setTransactionsByMonth] = useState({});

  useEffect(() => {
    setTransactionsByMonth(sortTransactions(transactions));
  }, [transactions]);

  return (
    <div className="w-full">
      {Object.entries(transactionsByMonth).map(([monthName, transaction]) => (
        <MonthlyTransactions
          key={monthName}
          month={monthName}
          monthlyTransactions={transaction}
          calculateReward={calculateReward}
          calculateTotalRewards={calculateTotalRewards}
        />
      ))}
    </div>
  );
}
