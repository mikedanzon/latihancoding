import React, { useEffect } from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  useEffect(() => {
    Axios.get('http://localhost:5000/karyawans')
    .then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err)
    })
  }, [])

  return (
    <div>
      test
    </div>
  );
}

export default App;
