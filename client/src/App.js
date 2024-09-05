import './App.css';
import Graph from './components/Graph';
import Forms from './components/Forms';
import Table from './components/Table';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { baseurl } from '../src/url';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reason: '',
    date: '',
    amount: '',
    
  });
  const [editingData, setEditingData] = useState(null);
  const formsRef = useRef(null);

  useEffect(() => {
    axios.get(`${baseurl}/data`)
      .then((res) => {
        setTransactions(res.data.data);
        console.log("data",res.data.data);
       
        

        
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (editingData) {
      if (formsRef.current) {
        formsRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [editingData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  return (
    <div className="App">
      <div className="container mx-auto max-w-6xl text-center drop-shadow-lg">
        <h1 className="bg-slate-500 text-white text-2xl p-3 rounded m-3 head">
          Balance Buddy ⚖️
        </h1>
        <div className="grid md:grid-cols-2 gap-4 mt-10">
          <Graph transactions={transactions} />
          <div ref={formsRef}>
            <Forms 
              editingData={editingData}
              setEditingData={setEditingData}
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          </div>
        </div>
        <Table 
          transactions={transactions}
          setFormData={setFormData}
          setEditingData={setEditingData}
        />
      </div>
    </div>
  );
}

export default App;

