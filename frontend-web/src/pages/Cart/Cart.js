import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import axios from 'axios';
import { createBrowserHistory } from 'history';
import { Alert } from 'react-bootstrap';
function Cart() {
    const { cartItems, updateCartItems, removeItemFromCart } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const history = createBrowserHistory();
    const handleQuantityChange = (index, action) => {
        const updatedCartItems = [...cartItems];
        if (action === 'increment') {
            updatedCartItems[index].quantity += 1;
        } else if (action === 'decrement') {
            if (updatedCartItems[index].quantity === 1) {
                // Remove item from cart if quantity becomes 0
                updatedCartItems.splice(index, 1);
            } else {
                updatedCartItems[index].quantity -= 1;
            }
        }
        updateCartItems(updatedCartItems); // Cập nhật giỏ hàng mới vào Context
    };

    useEffect(() => {
        // Không cần lưu trữ dữ liệu giỏ hàng vào localStorage ở đây nữa
    }, [cartItems]);

    const handleRemoveItem = (index) => {
        removeItemFromCart(index);
    };

    const totalAmount = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    const totalAmountFormatted = totalAmount.toLocaleString('vi-VN');

    const handlePayment = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
            history.push('/dang-nhap');
            return; // Dừng việc thêm sản phẩm vào giỏ hàng
        }
        const userID = parseInt(localStorage.getItem('userId'), 10);

        // Kiểm tra xem token và userID có hợp lệ không
        if (!token || isNaN(userID)) {
            console.error('Token or UserID is invalid');
            return;
        }

        // Kiểm tra giá trị của cartItems
        if (!cartItems || cartItems.length === 0) {
            console.error('Cart is empty');
            setShowAlert(true);
            return;
        }

        // Tạo một mảng mới chỉ chứa productID và quantity
        const itemsToSend = cartItems.map(item => ({
            ProductID: item.product.id,
            Quantity: item.quantity
        }));

        // Tạo đối tượng request tương tự như trên API
        const requestData = {
            CartItems: itemsToSend,
            UserID: userID
        };

        axios.post('https://localhost:7071/api/Payment/order', requestData)
            .then(response => {
                console.log(response.data);
                // Xử lý phản hồi từ server nếu cần
                // Xóa bộ nhớ giỏ hàng
                updateCartItems([]);
                history.push('/thanh-toan');
            })
            .catch(error => {
                console.error('Error:', error); // Xử lý lỗi nếu có
            });
    };

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.location.reload(); // Load lại trang khi history thay đổi
        });
        return () => {
            unlisten();
        };
    }, [history]);

    useEffect(() => {
        if (showAlert) {
            const timer = setTimeout(() => {
                setShowAlert(false);
            }, 2000); // 5000 milliseconds = 5 seconds

            return () => {
                clearTimeout(timer); // Clear the timeout if the component unmounts before 5 seconds
            };
        }
    }, [showAlert]);


    return (
        <>
            <Alert show={showAlert} variant="danger" onClose={() => setShowAlert(false)} dismissible>
                Giỏ hàng rỗng! Vui lòng thêm sản phẩm
            </Alert>
            <section className="section-content padding-y">
                <div className="container">
                    <div className="row">
                        <main className="col-md-9">
                            <div className="card">
                                <table className="table table-borderless table-shopping-cart">
                                    <thead className="text-muted">
                                        <tr className="small text-uppercase">
                                            <th scope="col">Product</th>
                                            <th scope="col" width={120}>
                                                Quantity
                                            </th>
                                            <th scope="col" width={120}>
                                                Price
                                            </th>
                                            <th scope="col" className="text-right" width={200}>
                                                {" "}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <figure className="itemside">
                                                        <div className="aside">
                                                            <img src={`../images/products/${item.product.avatar}`} className="img-sm" alt={item.product.name} />
                                                        </div>
                                                        <figcaption className="info">
                                                            <a href="#" className="title text-dark">
                                                                {item.product.name}
                                                            </a>
                                                            <p className="text-muted small">
                                                                Size: XL, Color: blue, <br /> Brand: Gucci
                                                            </p>
                                                        </figcaption>
                                                    </figure>
                                                </td>
                                                <td>
                                                    <div className="input-group mb-3 input-spinner">
                                                        <div className="input-group-prepend">
                                                            <button
                                                                className="btn btn-light"
                                                                type="button"
                                                                onClick={() => handleQuantityChange(index, 'decrement')}
                                                            >
                                                                -
                                                            </button>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={item.quantity}
                                                            readOnly
                                                        />
                                                        <div className="input-group-append">
                                                            <button
                                                                className="btn btn-light"
                                                                type="button"
                                                                onClick={() => handleQuantityChange(index, 'increment')}
                                                            >
                                                                +
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="price-wrap">
                                                        <var className="price">{item.product.price} VNĐ</var>

                                                    </div>{" "}
                                                    {/* price-wrap .// */}
                                                </td>
                                                <td className="text-right">
                                                    <a
                                                        data-original-title="Save to Wishlist"
                                                        title=""
                                                        href=""
                                                        className="btn btn-light"
                                                        data-toggle="tooltip"
                                                    >
                                                        {" "}
                                                        <i className="fa fa-heart" />
                                                    </a>
                                                    <button
                                                        onClick={() => handleRemoveItem(index)}
                                                        className="btn btn-light"
                                                    >
                                                        Remove
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div className="card-body border-top">
                                    <button className="btn btn-primary float-md-right" onClick={handlePayment}>
                                        Thanh toán <i className="fa fa-chevron-right" />
                                    </button>
                                    <a href="#" className="btn btn-light">
                                        {" "}
                                        <i className="fa fa-chevron-left" /> Continue shopping{" "}
                                    </a>
                                </div>
                            </div>{" "}
                            {/* card.// */}
                            <div className="alert alert-success mt-3">
                                <p className="icontext">
                                    <i className="icon text-success fa fa-truck" /> Free Delivery
                                    within 1-2 weeks
                                </p>
                            </div>
                        </main>{" "}
                        {/* col.// */}
                        <aside className="col-md-3">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <label>Have coupon?</label>
                                            <div className="input-group">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    name=""
                                                    placeholder="Coupon code"
                                                />
                                                <span className="input-group-append">
                                                    <button className="btn btn-primary">Apply</button>
                                                </span>
                                            </div>
                                        </div>
                                    </form>
                                </div>{" "}
                                {/* card-body.// */}
                            </div>{" "}
                            {/* card .// */}
                            <div className="card">
                                <div className="card-body">
                                    <dl className="dlist-align">
                                        <dt>Tổng tiền:</dt>
                                        <dd className="text-right  h5">
                                            <strong>{totalAmountFormatted} VNĐ</strong>
                                        </dd>
                                    </dl>
                                    <hr />
                                    <p className="text-center mb-3">
                                        <img src="images/misc/payments.png" height={26} />
                                    </p>
                                </div>{" "}
                                {/* card-body.// */}
                            </div>{" "}
                            {/* card .// */}
                        </aside>{" "}
                        {/* col.// */}
                    </div>
                </div>{" "}
                {/* container .//  */}
            </section>
            {/* ========================= SECTION CONTENT END// ========================= */}
            {/* ========================= SECTION  ========================= */}
            <section className="section-name border-top padding-y">
                <div className="container">
                    <h6>Payment and refund policy</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                        mollit anim id est laborum.
                    </p>
                </div>
                {/* container // */}
            </section>
        </>

    );
}

export default Cart;