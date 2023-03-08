import React from "react";
import Transaction from "./Transaction";

export default function MonthlyTransactions({
  monthlyTransactions,
  calculateReward,
  calculateTotalRewards,
  month,
}) {
  return (
    <div className="my-8 w-full">
      <div className="flex justify-between bg-purple-600 border-b rounded items-center p-2">
        <h4 className="text-base text-purple-100 font-semibold">{month}</h4>
        <h4 className="text-base text-purple-100 font-semibold">
          Monthly Rewards:{" "}
          {calculateTotalRewards(monthlyTransactions, calculateReward)}
        </h4>
      </div>
      <div className="flex justify-between border-b font-semibold items-center my-2 pb-2 px-4 text-gray-600">
        <p>Date</p>
        <p>Amount</p>
      </div>
      <div>
        {monthlyTransactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            date={transaction.date}
            amount={transaction.amount}
            reward={`${calculateReward(transaction.amount)} `}
          />
        ))}
      </div>
    </div>
  );
}
