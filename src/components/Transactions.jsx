import React, { useState, useEffect } from "react";
import moment from "moment";
import Transaction from "./Transaction";

// Sort Trans actions by Date
const sortTransactions = (transactions) => {
  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export default function Transactions({ transactions, calculateReward }) {
  const [sortedTransactions, setSortedTransactions] = useState([]);

  useEffect(() => {
    const today = moment();
    const newSortedTransactions = sortTransactions(transactions);

    // Remove transactions older than 90 days
    newSortedTransactions.forEach((transaction, i) => {
      if (today.diff(transaction.date) > 7776000000) {
        delete newSortedTransactions[i];
      }
    });
    setSortedTransactions(newSortedTransactions);
  }, [transactions]);

  return (
    <div className="w-full">
      {sortedTransactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          date={transaction.date}
          amount={transaction.amount}
          reward={`${calculateReward(transaction.amount)}`}
        />
      ))}
    </div>
  );
}
