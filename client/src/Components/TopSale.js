import React, { useEffect, useState } from 'react'
import Alerter from "sweetalert2"


 const TopSale = () => {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3200/topSales",{
            method:"GET",
            headers:{"Authorization":"Bearer " + localStorage.getItem("token")}
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(Alerter.fire({
                        title: 'Error!',
                        text: 'Failed To Fetch Or Login First',
                        icon: 'error',
                        confirmButtonText: 'Cool'
                      }));
                }
                return response.json();
            })
            .then(data => setSales(data.sales))
            .catch(error => console.error(error));

    }, []);

    return (
        <div className='container'>
             <h3 className='text-center text-uppercase pt-4'>Top 5 sales</h3>
             <div className='row pt-5 mx-auto '>
             <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Sales ID:</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Sales Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales && sales.map((sales,index) => (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{sales._id}</td>
                                <td>{sales.productName}</td>
                                <td>{sales.quantity}</td>
                                <td>{sales.amount}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TopSale