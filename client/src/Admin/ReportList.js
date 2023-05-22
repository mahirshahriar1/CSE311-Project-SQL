import React from 'react'
import Navbar from '../Components/Navbar'
import Axios from 'axios';
import { useState, useEffect } from 'react';


export default function ReportList() {


    const [admin, setAdmin] = useState(false);

    Axios.defaults.withCredentials = true;

    const [reports, setReports] = useState([]);


    const importReports = (status) => {
        //admin route
        Axios.get('http://localhost:3001/importReports').then((response) => {
            // console.log(response.data);
            setReports(response.data);
            //console.log(response.data);
            //console.log(reports);
        }
        );

    };

    const deleteReport = (id) => {
        //console.log(id);
        //admin route
        Axios.post('http://localhost:3001/deleteReport', { id: id }).then((response) => {
            if (response.data.status === 201) {

                importReports();

                alert('Report Deleted Successfully');

            }
        }
        );
    };


    useEffect(() => {
        //logreg route
        Axios.get('http://localhost:3001/login').then((response) => {
            if (response.data.type === 'Admin') {
                setAdmin(true);
            }
        }
        )
        importReports();

    }, [admin])

    const deleteProduct = (id, Image) => {
        //console.log(id);
        //customer route
        Axios.delete(`http://localhost:3001/dltProduct/${id}/${Image}`).then((response) => {
            if (response.data.status === 201) {
                //console.log(response.data);
                importReports();
                alert('Product Deleted Successfully');
            }
        }
        );

    };



    return (
        admin && <div id='particles'>
            <Navbar />
            <div style={{ margin: '50px' }}></div>
            <div className="container"  
            style={{background:'rgb(8, 22, 33)'}}
            >

                <div className="row">
                    <div className="col-12">
                        <table className="table table-image " style={{ color: 'rgb(227, 222, 222)' }}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Date of Report</th>
                                    <th scope="col">Reported Product</th>
                                    <th scope="col">Reported By</th>
                                    <th scope="col">Comment </th>
                                    <th scope="col">Action 1</th>
                                    <th scope="col">Action 2</th>
                                    <th scope="col">Action 3</th>
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
                                            <button className="btn btn-danger"
                                                onClick={() => deleteProduct(item.ProductID, item.Image)}
                                            >Delete Product</button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success"
                                                onClick={() => deleteReport(item.ID)}
                                            >Delete Report</button>
                                        </td>
                                        <td>
                                            {/* <Link to={`/ItemInfo/${id}`} className="btn btn-primary">Check</Link> */}
                                            <button className="btn btn-primary"
                                                onClick={() =>
                                                    window.location.href = `/ItemInfo/${item.ProductID}`
                                                }
                                            >Check Product</button>
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

