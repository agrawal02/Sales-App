import React, { useState, useEffect } from 'react'



export const Revenue = () => {

    const [sales, setSales] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3200/topSales", {
            method: "GET",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then(data => setSales(data.sales))
            .catch(error => console.error(error));

    }, []);

    const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);

    return (
        <>
            <h2
                style={{ textAlign: "center", marginTop: "3vh", fontFamily: "'Ubuntu', sans-serif", fontWeight: "bolder" }}>
                TODAY'S REVENUE IS:
            </h2>
            <div className='d-flex justify-content-center'>
                <input type="number" value={totalRevenue} readOnly className='fw-bolder text-center fs-4' />
            </div>
        </>
    )
}

export default Revenue