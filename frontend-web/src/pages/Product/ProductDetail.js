import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useCart } from '../Cart/CartContext';
import { Alert } from 'react-bootstrap';
import { createBrowserHistory } from "history";
function ProductDetail() {
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const { id } = useParams();
    const { updateCartItems } = useCart();
    const [showAlert, setShowAlert] = useState(false);
    const history = createBrowserHistory();
    useEffect(() => {
        axios.get(`https://localhost:7071/api/Product/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    const handleAddToCart = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
            history.push('/dang-nhap');
            return; // Dừng việc thêm sản phẩm vào giỏ hàng
        }
        // Logic thêm sản phẩm vào giỏ hàng
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let productIndex = cart.findIndex(item => item.product.id === product.id);

        if (productIndex !== -1) {
            // Nếu sản phẩm đã tồn tại trong giỏ hàng, cộng dồn số lượng
            cart[productIndex].quantity += quantity;
        } else {
            // Nếu sản phẩm chưa tồn tại trong giỏ hàng, thêm mới vào danh sách
            cart.push({
                product: {
                    id: product.id,
                    name: product.name,
                    avatar: product.avatar,
                    categoryId: product.categoryId,
                    shortDes: product.shortDes,
                    fullDescription: product.fullDescription,
                    price: product.price,
                    priceDiscount: product.priceDiscount,
                    typeId: product.typeId,
                    slug: product.slug,
                    brandId: product.brandId,
                    deleted: product.deleted,
                    showOnHomePage: product.showOnHomePage,
                    displayOrder: product.displayOrder,
                    createdOnUtc: product.createdOnUtc,
                    updatedOnUtc: product.updatedOnUtc
                },
                quantity: quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartItems(cart); // Cập nhật giỏ hàng thông qua context
        console.log("Product added to cart successfully.");
        // Thêm logic xử lý sau khi thêm sản phẩm vào giỏ hàng thành công

        setShowAlert(true); // Hiển thị thông báo
        console.log("Product added to cart successfully.");


    };

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.location.reload(); // Load lại trang khi history thay đổi
        });
        return () => {
            unlisten();
        };
    }, [history]);

    const handleInputChange = (event) => {
        // Kiểm tra giá trị nhập vào từ input
        let value = parseInt(event.target.value);
        // Nếu giá trị nhập vào là NaN hoặc nhỏ hơn hoặc bằng 0, thì cập nhật lại giá trị là 1
        if (isNaN(value) || value <= 0) {
            value = 1;
        }
        setQuantity(value);
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };
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
            <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                Thêm vào giỏ hàng thành công
            </Alert>
            <section className="section-content bg-white padding-y">
                <div className="container">
                    {/* ============================ ITEM DETAIL ======================== */}
                    <div className="row">
                        <aside className="col-md-6">
                            <div className="card">
                                <article className="gallery-wrap">
                                    <div className="img-big-wrap">
                                        <div>
                                            {" "}
                                            <a href="#">
                                                <img src={`../images/products/${product.avatar}`} alt={product.name} />
                                            </a>
                                        </div>
                                    </div>{" "}
                                    {/* slider-product.// */}
                                    <div className="thumbs-wrap">
                                        <a href="#" className="item-thumb">
                                            {" "}
                                            <img src={`../images/products/${product.avatar}`} alt={product.name} />
                                        </a>
                                        <a href="#" className="item-thumb">
                                            {" "}
                                            <img src={`../images/products/${product.avatar}`} alt={product.name} />
                                        </a>
                                        <a href="#" className="item-thumb">
                                            {" "}
                                            <img src={`../images/products/${product.avatar}`} alt={product.name} />
                                        </a>
                                        <a href="#" className="item-thumb">
                                            {" "}
                                            <img src={`../images/products/${product.avatar}`} alt={product.name} />
                                        </a>
                                    </div>{" "}
                                    {/* slider-nav.// */}
                                </article>{" "}
                                {/* gallery-wrap .end// */}
                            </div>{" "}
                            {/* card.// */}
                        </aside>
                        <main className="col-md-6">
                            <article className="product-info-aside">
                                <h2 className="title mt-3">{product.name} </h2>
                                <div className="rating-wrap my-3">
                                    <ul className="rating-stars">
                                        <li style={{ width: "80%" }} className="stars-active">
                                            <i className="fa fa-star" /> <i className="fa fa-star" />
                                            <i className="fa fa-star" /> <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                        </li>
                                        <li>
                                            <i className="fa fa-star" /> <i className="fa fa-star" />
                                            <i className="fa fa-star" /> <i className="fa fa-star" />
                                            <i className="fa fa-star" />
                                        </li>
                                    </ul>
                                    <small className="label-rating text-muted">132 reviews</small>
                                    <small className="label-rating text-success">
                                        {" "}
                                        <i className="fa fa-clipboard-check" /> 154 orders{" "}
                                    </small>
                                </div>{" "}
                                {/* rating-wrap.// */}
                                <div className="mb-3">
                                    <var className="price h4">Giảm còn {product.priceDiscount}</var>
                                    <span className="text-muted">Giá gốc {product.price}</span>
                                </div>{" "}
                                {/* price-detail-wrap .// */}
                                <p>
                                    {product.fullDescription}{" "}
                                </p>
                                <dl className="row">
                                    <dt className="col-sm-3">Manufacturer</dt>
                                    <dd className="col-sm-9">
                                        <a href="#">Great textile Ltd.</a>
                                    </dd>
                                    <dt className="col-sm-3">Article number</dt>
                                    <dd className="col-sm-9">596 065</dd>
                                    <dt className="col-sm-3">Guarantee</dt>
                                    <dd className="col-sm-9">2 year</dd>
                                    <dt className="col-sm-3">Delivery time</dt>
                                    <dd className="col-sm-9">3-4 days</dd>
                                    <dt className="col-sm-3">Availabilty</dt>
                                    <dd className="col-sm-9">in Stock</dd>
                                </dl>
                                <div className="form-row  mt-4">
                                    <div className="form-group col-md flex-grow-0">
                                        <div className="input-group mb-3 input-spinner">
                                            <div className="input-group-prepend">
                                                <button
                                                    className="btn btn-light"
                                                    type="button"
                                                    onClick={handleDecrement}
                                                >
                                                    {" "}
                                                    -{" "}
                                                </button>
                                            </div>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={quantity}
                                                onChange={handleInputChange}
                                            />
                                            <div className="input-group-append">
                                                <button
                                                    className="btn btn-light"
                                                    type="button"
                                                    onClick={handleIncrement}
                                                >
                                                    {" "}
                                                    +{" "}
                                                </button>
                                            </div>
                                        </div>
                                    </div>{" "}
                                    {/* col.// */}
                                    <div className="form-group col-md">
                                        <button className="btn btn-primary" onClick={handleAddToCart}>
                                            <i className="fas fa-shopping-cart" />{" "}
                                            <span className="text">Add to cart</span>
                                        </button>
                                        <a href="#" className="btn btn-light">
                                            <i className="fas fa-envelope" />{" "}
                                            <span className="text">Contact supplier</span>
                                        </a>
                                    </div>{" "}
                                    {/* col.// */}
                                </div>{" "}
                                {/* row.// */}
                            </article>{" "}
                            {/* product-info-aside .// */}
                        </main>{" "}
                        {/* col.// */}
                    </div>{" "}
                    {/* row.// */}
                    {/* ================ ITEM DETAIL END .// ================= */}
                </div>{" "}
                {/* container .//  */}
            </section>
        </>

    );
}

export default ProductDetail;