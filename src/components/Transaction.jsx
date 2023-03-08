import moment from "moment";
export default function Transaction({ amount, date, reward }) {
  const newDate = moment(date).format("MMMM Do");

  return (
    <div className="flex w-full justify-between border-b items-center my-2 pb-2 px-4 text-gray-600">
      <p>{newDate}</p>
      <div className="text-right">
        <p>${amount}</p>
        <p className="text-sm flex justify-end items-center">
          rewards: {reward}
        </p>
      </div>
    </div>
  );
}
