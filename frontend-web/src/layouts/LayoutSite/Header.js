import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { useCart } from '../../pages/Cart/CartContext'; // Import từ thư viện "history"
import Axios from 'axios';
function Header() {
    const history = createBrowserHistory(); // Sử dụng createBrowserHistory() từ thư viện "history"
    const { cartItems } = useCart();
    const location = useLocation(); // Use useLocation hook to access location
    const [searchText, setSearchText] = useState('');
    const uniqueProductCount = new Set(cartItems.map(item => item.product.id)).size;
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        Axios.get('https://localhost:7071/api/Category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    const handleLogout = () => {
        // Xóa token từ localStorage khi đăng xuất
        localStorage.removeItem('token');
        // Chuyển hướng về trang đăng nhập
        history.push('/dang-nhap');
    };
    useEffect(() => {
        const unlisten = history.listen(() => {
            window.location.reload(); // Load lại trang khi history thay đổi
        });
        return () => {
            unlisten();
        };
    }, [history]);
    const handleSearch = () => {
        if (searchText.trim() !== '') {
            const searchParams = new URLSearchParams(location.search);
            searchParams.set('keyword', searchText);
            const queryString = searchParams.toString();
            window.location.href = `/tim-kiem?${queryString}`;
        }
    };

    return (
        <>
            <header className="section-header">
                <section className="header-main border-bottom">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-xl-2 col-lg-3 col-md-12">
                                <Link to={`/`} className="brand-wrap">
                                    <img className="logo" src="../images/logo.png" />
                                </Link>{" "}
                                {/* brand-wrap.// */}
                            </div>
                            <div className="col-xl-6 col-lg-5 col-md-6">
                                <form className="search-header" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                                    <div className="input-group w-100">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search"
                                            value={searchText} onChange={(e) => setSearchText(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" type="submit">
                                                <i className="fa fa-search" /> Search
                                            </button>
                                        </div>
                                    </div>
                                </form>{" "}
                                {/* search-wrap .end// */}
                            </div>{" "}
                            {/* col.// */}
                            <div className="col-xl-4 col-lg-4 col-md-6">
                                <div className="widgets-wrap float-md-right">
                                    <div className="widget-header mr-3">
                                        {localStorage.getItem('token') ? (
                                            <>
                                                {/* Hiển thị thông tin người dùng và nút logout */}
                                                <div className="icon-area">
                                                    <i className="fa fa-user" />

                                                </div>

                                                <small className="text">{localStorage.getItem('userFullName')}</small>
                                                <button onClick={handleLogout}>Logout
                                                </button>
                                            </>
                                        ) : (
                                            // Nếu chưa đăng nhập, hiển thị nút đăng nhập
                                            <Link to={`/dang-nhap`} className="widget-view">
                                                <div className="icon-area">
                                                    <i className="fa fa-user" />

                                                </div>
                                                <small className="text"> My profile </small>
                                            </Link>
                                        )}
                                    </div>
                                    <div className="widget-header mr-3">
                                        <a href="#" className="widget-view">
                                            <div className="icon-area">
                                                <i className="fa fa-comment-dots" />
                                                <span className="notify">1</span>
                                            </div>
                                            <small className="text"> Message </small>
                                        </a>
                                    </div>
                                    <div className="widget-header mr-3">
                                        <a href="#" className="widget-view">
                                            <div className="icon-area">
                                                <i className="fa fa-store" />
                                            </div>
                                            <small className="text"> Orders </small>
                                        </a>
                                    </div>
                                    <div className="widget-header">
                                        <Link to={`/gio-hang`} className="widget-view">
                                            <div className="icon-area">
                                                <i className="fa fa-shopping-cart" />
                                                {uniqueProductCount > 0 && (
                                                    <span className="notify">{uniqueProductCount}</span>
                                                )}

                                            </div>
                                            <small className="text"> Cart </small>
                                        </Link>
                                    </div>
                                </div>{" "}
                                {/* widgets-wrap.// */}
                            </div>{" "}
                            {/* col.// */}
                        </div>{" "}
                        {/* row.// */}
                    </div>{" "}
                    {/* container.// */}
                </section>{" "}
                {/* header-main .// */}
                <nav className="navbar navbar-main navbar-expand-lg border-bottom">
                    <div className="container">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-toggle="collapse"
                            data-target="#main_nav"
                            aria-controls="main_nav"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse" id="main_nav">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#">
                                        <i className="fa fa-bars text-muted mr-2" /> Categories
                                    </a>
                                    <div className="dropdown-menu">
                                        {categories.map(category => (
                                            <Link key={category.id} className="dropdown-item" to={`/danh-muc/${category.id}`}>
                                                {category.name}
                                            </Link>
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        </div>{" "}
                        {/* collapse .// */}
                    </div>{" "}
                    {/* container .// */}
                </nav>
            </header>{" "}
            {/* section-header.// */}
        </>
    );
}

export default Header;