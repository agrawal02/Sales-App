import React, { useState } from "react";
import Alerter from "sweetalert2"


const defaultSalesField = { productName: "", quantity: "", amount: "" };

export const AddSales = () => {
    const [salesData, setSalesData] = useState(defaultSalesField);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { productName, quantity, amount } = salesData
        try {
            await fetch("https://sales-app-9snj.onrender.com", {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({ productName, quantity, amount })

            })
                .then((response) => {
                    if (response.ok) {

                        return response.json();
                    } else {

                        throw new Error("User Not Register")
                    }
                })
                .then((found) => {
                    console.log(found)
                    Alerter.fire({
                        title: 'Success!',
                        text: 'Sales Added Successfully',
                        icon: 'success',
                        confirmButtonText: 'Add More!'
                    })
                }).catch((err) => {
                    if (err) {
                        Alerter.fire({
                            title: 'error!',
                            text: 'User Not Register.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    } else {
                        Alerter.fire({
                            title: 'error!',
                            text: 'Server Not Responding/Connection Error.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                })
            setSalesData(defaultSalesField);
        } catch (error) {
            console.log(error)
        }

    };
    return (

        <div className="container">
            <h3 className='text-center text-uppercase pt-4'>ADD SALES ENTRY</h3>
            <div className='mx-auto contact-form-container text-muted shadow-sm rounded p-3 lh-2'>
                <form method="POST" className='d-flex flex-column justify-content-start' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className='mt-3 text-muted'>Product Name</label>
                        <input type="text" name='productName' className="form-control mt-2" required
                            value={salesData.productName}
                            onChange={(e) => setSalesData({ ...salesData, productName: e.target.value, })} />
                    </div>
                    <div className="mb-3">
                        <label className='mt-3 text-muted'>Quantity</label>
                        <input type="text" name='quantity' className="form-control mt-2" required
                            value={salesData.quantity}
                            onChange={(e) => setSalesData({ ...salesData, quantity: e.target.value, })} />
                    </div>
                    <div className="mb-3">
                        <label className='mt-3 text-muted'>Amount</label>
                        <input type="text" name='amount' className="form-control mt-2" required
                            value={salesData.amount}
                            onChange={(e) => setSalesData({ ...salesData, amount: e.target.value, })} />
                    </div>
                    <div className='d-grid'>
                        <button type="submit" className="btn btn-primary">Submit</button> </div>
                </form>
            </div>
        </div>
    )
}

export default AddSales