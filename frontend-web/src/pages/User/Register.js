import React, { useState } from "react";
import axios from "axios";
import { createBrowserHistory } from "history";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const history = createBrowserHistory();

function Register() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://localhost:7071/api/User/register", formData);
            if (response.status === 200) {
                // Redirect to "/dang-nhap" if registration successful
                history.push("/dang-nhap");
            }
        } catch (error) {
            console.error("Registration failed:", error);
        }
    };
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.location.reload(); // Load lại trang khi history thay đổi
        });
        return () => {
            unlisten();
        };
    }, [history]);
    return (
        <>
            <section className="section-content padding-y">
                <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
                    <article className="card-body">
                        <header className="mb-4">
                            <h4 className="card-title">Register</h4>
                        </header>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="col form-group">
                                    <label>First name</label>
                                    <input type="text" className="form-control" name="firstName" onChange={handleChange} required />
                                </div>
                                <div className="col form-group">
                                    <label>Last name</label>
                                    <input type="text" className="form-control" name="lastName" onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" name="email" onChange={handleChange} required />
                                <small className="form-text text-muted">
                                    We'll never share your email with anyone else.
                                </small>
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" name="password" onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Register</button>
                            </div>
                            <div className="form-group">
                                <label className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" defaultChecked={false} required />
                                    <div className="custom-control-label">
                                        I agree with <a href="#">terms and conditions</a>
                                    </div>
                                </label>
                            </div>
                        </form>
                    </article>
                </div>
                <p className="text-center mt-4">
                    Have an account? <Link to={`/dang-nhap`}>Log In</Link>
                </p>
            </section>
        </>
    );
}

export default Register;
