import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function ProductDeal() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7071/api/Product')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <section className="padding-bottom">
                <div className="card card-deal">
                    <div className="col-heading content-body">
                        <header className="section-heading">
                            <h3 className="section-title">Deals and offers</h3>
                            <p>Hygiene equipments</p>
                        </header>
                        {/* sect-heading */}
                        <div className="timer">
                            <div>
                                {" "}
                                <span className="num">04</span> <small>Days</small>
                            </div>
                            <div>
                                {" "}
                                <span className="num">12</span> <small>Hours</small>
                            </div>
                            <div>
                                {" "}
                                <span className="num">58</span> <small>Min</small>
                            </div>
                            <div>
                                {" "}
                                <span className="num">02</span> <small>Sec</small>
                            </div>
                        </div>
                    </div>{" "}
                    {/* col.// */}
                    <div className="row no-gutters items-wrap">
                        {products.slice(0, 5).map(product => (
                            <div key={product.id} className="col-md col-6">
                                <Link to={`/chi-tiet-san-pham/${product.id}`} className="card-product-grid card-sm">
                                    <figure className="card-product-grid card-sm">
                                        <div className="img-wrap">
                                            <img src={`images/products/${product.avatar}`} alt={product.name} />
                                        </div>
                                        <div className="text-wrap p-3">
                                            <span className="badge badge-danger"> -{product.priceDiscount}% </span>
                                        </div>
                                    </figure>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

export default ProductDeal;
