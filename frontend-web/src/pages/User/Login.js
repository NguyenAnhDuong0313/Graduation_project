import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { createBrowserHistory } from 'history'; // Import từ thư viện "history"
import { Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = createBrowserHistory(); // Sử dụng createBrowserHistory() từ thư viện "history"

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('https://localhost:7071/api/User/login', { email, password });
            const token = response.data.token;
            const userFullName = response.data.userFullName;
            const userId = response.data.userId;
    
            // Lưu token và tên người dùng vào localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('userFullName', userFullName);
            localStorage.setItem('userId', userId);
            // Chuyển hướng sang trang Home
            history.push('/trang-chu');
        } catch (error) {
            console.error('Login failed', error);
            // Xử lý lỗi, hiển thị thông báo cho người dùng nếu cần
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
            <section className="section-conten padding-y" style={{ minHeight: "84vh" }}>
                <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 100 }}>
                    <div className="card-body">
                        <h4 className="card-title mb-4">Sign in</h4>
                        <form onSubmit={handleSubmit}>
                            {/* Các phần tử HTML khác */}
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder="Email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    placeholder="Password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
                <p className="text-center mt-4">Don't have an account? <Link to={`/dang-ky`}>Register</Link></p>
            </section>
        </>
    );
}

export default Login;
