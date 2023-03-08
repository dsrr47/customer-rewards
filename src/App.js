import { useEffect, useState } from "react";
import Customer from "./components/Customer";

function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("data.json")
      .then((responose) => responose.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="bg-gray-300">
      <header className="bg-cyan-600">
        <h1 className="text-center text-4xl font-black p-5 text-gray-100">
          Customer Rewards
        </h1>
      </header>
      {loading ? (
        <div>Data Loading...</div>
      ) : (
        data.customers.map((customer) => (
          <div className="flex justify-center" key={customer._id}>
            <Customer
              name={customer.name}
              email={customer.email}
              transactions={customer.transaction}
            />
          </div>
        ))
      )}
    </div>
  );
}

export default App;
