import React, { useEffect, useState } from 'react';

import './root.css'
import MainHeader from './components/mainHeader';
import ResultsTable from './components/resultsTable';

function App() {

  const [searchCriteria, setSearchCriteria] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function searchCompaniesHouse() {
    if (!searchCriteria) { // we can do something more sophisticated later ...
      alert("Enter search criteria to proceed");
      return;
    };

    const res = await fetch("http://127.0.0.1:5000/search_ch", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json", }),
            body: JSON.stringify({ search_criteria: searchCriteria, }),
        });
        const res_json = await res.json();
        if (res.ok && res.status === 200) {
          let search_results = [];
          console.log(res_json)
          setSearchResults(res_json.items);
        } else { console.log("Error retrieving residents from database..."); }
  };

  useEffect(() => {
    console.log(searchResults)
  }, [searchResults]);

  return (
    <div className="App">
      <div style={cardStyle}>
        <MainHeader></MainHeader>
        <div className="row">
          <input 
            id="search_input" 
            placeholder="Search Company Name..."
            value={searchCriteria} 
            onChange={e => setSearchCriteria(e.target.value)} 
          ></input>
          <button className="btn" onClick={searchCompaniesHouse}>Enter</button>
        </div>
        <div style={cardStyle}><ResultsTable searchResults={searchResults}></ResultsTable></div>
        
      </div>
    </div>
  );
}

// An example of adding css within rendered JSX...although I prefer to use seperate .css files
const cardStyle = {
  textAlign: 'center',
  margin: 'auto',
  width: '90%',
  padding: '20px',
  boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  borderRadius: "10px",
}

export default App;
