import React from 'react'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';


export default function ReportList() {


    const [admin, setAdmin] = useState(false);

    Axios.defaults.withCredentials = true;

    const [reports, setReports] = useState([]);


    const importReports = (status) => {

        Axios.get('http://localhost:3001/importReports').then((response) => {
            // console.log(response.data);
            setReports(response.data);
            //console.log(response.data);
            //console.log(reports);
        }
        );

    };



    useEffect(() => {

        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.type === 'Admin') {
                setAdmin(true);
            }
        }
        )
        importReports();

    }, [admin])



    return (
        admin && <div>
            <Navbar />

            <div className="container" >

                <div className="row">
                    <div className="col-12">
                        <table className="table table-image">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"> Date of Report</th>
                                    <th scope="col">Reported Product</th>
                                    <th scope="col">Reported By</th>
                                    <th scope="col">Comment </th>
                                    <th scope="col">Action</th>
                                </tr>

                            </thead>
                            <tbody>
                                {reports.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{item.DateOfReport.trim().substring(0, 10)
                                        }</td>
                                        <td>{item.ProductID}</td>
                                        <td>{item.CustomerID}</td>
                                        <td>{item.TextOfReport}</td>
                                        <td>
                                            <button className="btn btn-danger" ></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

