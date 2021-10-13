import React, { useState } from 'react';
import './css/resultsTable.css';

function ResultsTable(props) {

    const [resultsParagraph, setResultsParagraph] = useState("");

    var companyList = []
    for (var i = 0; i < props.searchResults.length; i++) {
        companyList.push([i, props.searchResults[i].title, props.searchResults[i].company_number])
    };

    const listItems = companyList.map((company) =>
        <li key={company[0]}>
        {company[1]} | {company[2]}
        </li>
    );

    const handleClick = (e) => {
        setResultsParagraph("");
        const selection = e.target.textContent.split("|")

        fetch("http://127.0.0.1:5000/search_company", { //synchronous version of fetch request
            method: "POST",
            headers: new Headers({ "content-type": "application/json", }),
            body: JSON.stringify({ company_number: selection[1] }),
        })
        .then(r =>  r.json())
        .then(res_json => {
            // console.log(res_json)
            setResultsParagraph(JSON.stringify(res_json));
        });

        
        // console.log(companyNumber)
    };

    return (
        <div>
            <ul id="results_list" onClick={(e) => handleClick(e)}>{listItems}</ul>
            <p>{resultsParagraph}</p>
        </div>
    );
}

export default ResultsTable;