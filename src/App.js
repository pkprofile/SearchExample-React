import React from "react";
import { useState, useEffect } from 'react'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [jsondata, setData] = useState([]);  
  useEffect(()=>{
    axios.get('data.json')
    .then(response => {
        console.log(response.data)
        setData(response.data.data)
    })
})
  
  const [searchInput, SetSearchInput] = useState("");

    const FilteredData = () => {
        return jsondata.filter(
            (txt) =>
              txt.firstName.toLowerCase().includes(searchInput.toLowerCase()) ||
              txt.lastName.toLowerCase().includes(searchInput.toLowerCase()) ||              
              txt.dob.toLowerCase().includes(searchInput.toLowerCase()) ||
              txt.phone.toLowerCase().includes(searchInput.toLowerCase()) ||
              txt.country.toLowerCase().includes(searchInput.toLowerCase())||
              txt.status.toLowerCase().includes(searchInput.toLowerCase())
        );
    };
    
    return (
      <>
          <div className="container-fluid mt-4 mb-4">
              <div className="row justify-content-center">
                  <div className="col-md-10">
                      <div className="card">
                          <div className="card-body p-3">
                              <div className="row justify-content-between align-items-center">
                                  <div className="col-md-3">
                                      {FilteredData().length === jsondata.length ? (
                                          ""
                                      ) : (
                                          <h5 className="text-primary">
                                              Search ({FilteredData().length}) result found from {jsondata.length}
                                          </h5>
                                      )}
                                  </div>
                                  <div className="col-md-3">
                                      <div className="form-group mb-0">
                                          <input type="text" className="form-control" placeholder="Search" value={searchInput} onChange={(e) => SetSearchInput(e.target.value)} />
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="card-body p-0">
                              <div className="table-responsive">
                                  <table className="table table-text-small mb-0">
                                      <thead className="thead-dark table-sorting">
                                          <tr>
                                              <th>#</th>
                                              <th>First Name</th>
                                              <th>Last Name </th>
                                              <th>DOB</th>
                                              <th>Phone</th>
                                              <th>Status </th>
                                              <th>Country </th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          {FilteredData().map((data, index) => {
                                              const { id, firstName, lastName, dob, phone, status, country } = data;
                                              return (
                                                  <tr key={index}>
                                                      <td>{id}</td>
                                                      <td>{firstName}</td>
                                                      <td>{lastName}</td>
                                                      <td>{dob}</td>
                                                      <td>{phone}</td>
                                                      <td>{status}</td>
                                                      <td>{country}</td>
                                                  </tr>
                                              );
                                          })}
                                      </tbody>
                                  </table>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div> 
                
      </>
  );
}

export default App;
