import axios from "axios";
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [decimal, setDecimal] = useState("");
  const [totalsupply, setTotalsupply] = useState("");
  const [address, setAddress] = useState("");
  const [balance,setBalance] = useState("");
  const [Formdata,setFormdata] = useState({to:"",amount:""});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData)=>({
      ...prevData,
      [name]:value,
    }));
  };

  const getName = () => {
    console.log("here enterd 1");
    axios
      .get("http://localhost:3000/api/route/name")
      .then((response) => {
        console.log("here enterd");
        setName(response.data);
      })
      .catch((error) => {
        console.log("here enterd in catch");
        console.error("Error:", error);
      });
  };

  const getSymbol = () => {
    axios
      .get("http://localhost:3000/api/route/symbol")
      .then((response) => {
        setSymbol(response.data.symbol);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log("Symbol", symbol);
  };

  const getDecimal = () => {
    axios
      .get("http://localhost:3000/api/route/decimals")
      .then((response) => {
        // console.log(response);
        setDecimal(response.data.decimal);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getTotalsupply = () => {
    axios
      .get("http://localhost:3000/api/route/totalsupply")
      .then((response) => {
        setTotalsupply(response.data.total_supply);
      });
  };

  const availableToken = (address) => {
    console.log("address", address);
    const requestData = {
      address: address, 
    };

    console.log(typeof(requestData));

    axios
      .post("http://localhost:3000/api/route/balance", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBalance(response.data.Account_bal);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const token_Transfer = (e) => {
    e.preventDefault();
    const requestData = {
      to:Formdata.to,
      amount:Formdata.amount
    }
    console.log(requestData);
    axios.post("http://localhost:3000/api/route/transfer",requestData).then((response)=>{
      console.log(response);
    }).catch((error)=>{
      console.log(error);
    })
  }

  return (
    <>
      <div className="flex justify-center items-center my-20 gap-3">
        <h1 className="text-red-600">Contract Address :-</h1>
        <p>0xC71DC472B25B7b2E446F829793F54BaA204e14E4</p>
      </div>
      <div className="flex justify-center items-center gap-3">
        <div className="">
          <h1>{name}</h1>
          <button
            className="border-2 border-blue-500 rounded-xl p-3"
            onClick={getName}
          >
            Token name
          </button>
        </div>
        <div>
          <h1>{symbol}</h1>
          <button
            className="border-2 border-blue-500 rounded-xl p-3"
            onClick={getSymbol}
          >
            Token symbol
          </button>
        </div>
        <div>
          <h1>{decimal}</h1>
          <button
            className="border-2 border-blue-500 rounded-xl p-3"
            onClick={getDecimal}
          >
            Token decimals
          </button>
        </div>
        <div>
          <h1>{totalsupply}</h1>
          <button
            className="border-2 border-blue-500 rounded-xl p-3"
            onClick={getTotalsupply}
          >
            Token totalsupply
          </button>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-12">
        <h1>Available token :- {balance}</h1>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter your address"
            className="border-2 border-blue-500"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
          <button
            className="border-2 border-blue-500 rounded-xl p-3"
            onClick={() => availableToken(address)}
          >
            Token balance
          </button>
        </div>
        <div className="flex flex-col justify-center items-center my-5">
          <h1 className="my-5">Trasfer token form</h1>
          <form action="POST" onSubmit={token_Transfer} className="flex flex-col gap-3">
            <input type="text" name="to" value={Formdata.to} id="" placeholder="Enter receiver address" className="border-2 border-blue-500 h-[50px]" onChange={handleInputChange}/>
            <input type="text" name="amount" value={Formdata.amount} placeholder="Enter token amount" className="border-2 border-blue-500 h-[50px]" onChange={handleInputChange}/>
            <button type="submit" className="border-2 rounded-full h-[60px] hover:bg-gray-400">Transfer</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
