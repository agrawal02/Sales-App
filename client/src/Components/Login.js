import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Alerter from "sweetalert2";

const defaultLogin = { email: "", password: "" };

export const Login = () => {

    const [login, setLogin] = useState(defaultLogin)
    const [loading, setloading] = useState(false)

    const handleLogin = (e) => {
        e.preventDefault();

        const { email, password } = login;
        setloading(true)

        try {
            fetch("https://sales-app-9snj.onrender.com", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })

            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Invalid Credential")
                    } else {
                        return response.json();
                    }

                }).then((found) => {
                    localStorage.setItem("token", found.result.token)
                    localStorage.setItem("user", JSON.stringify(found.result.user))
                    Alerter.fire({
                        title: 'Success!',
                        text: 'Your login was successful.',
                        icon: 'success',
                        confirmButtonText: 'OK',

                    }).then((result) => {
                        if (result.isConfirmed) {
                            setloading(false);
                            window.location.href = "/addSales";
                        }
                    });

                }).catch((err) => {
                    if (err.message === "Invalid Credential") {
                        Alerter.fire({
                            title: 'error!',
                            text: 'Invalid Credential.',
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
                    setloading(false)
                    setLogin(defaultLogin)
                })

        } catch (error) {
            console.log(error)
        }

    }
    return (


        <div className='container'>
            <h3 className='text-center text-uppercase pt-4'>Login form</h3>

            <div className='mx-auto contact-form-container text-muted shadow-sm rounded p-3 lh-2'>
                <form className='d-flex flex-column justify-content-start' onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className='mt-3 text-muted'>Email</label>
                        <input type="email" name='email' className='form-control mt-2' required
                            value={login.email} onChange={(e) => setLogin({ ...login, email: e.target.value })} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className='mt-3 text-muted'>Password</label>
                        <input type="password" name='password' className='form-control mt-2' required
                            value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} />
                    </div>


                    {loading ? (
                        <button className="btn btn-primary mt-3 mb-3" type="submit" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <input type="submit" value="Submit" className="btn btn-primary mt-3 mb-3" />
                    )}
                </form>

            </div>
            <div className="container d-flex justify-content-center">
                <span className="text-muted">Don't Have An Account? <NavLink to="/register" className="text-decoration-none">Create Account</NavLink></span>
            </div>
        </div>
    )
}

export default Login