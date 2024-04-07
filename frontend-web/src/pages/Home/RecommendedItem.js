import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function RecommendedItem() {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    // Tính toán index của sản phẩm đầu tiên và cuối cùng trên trang hiện tại
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Logic để chuyển đổi trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            <section className="padding-bottom-sm">
                <header className="section-heading heading-line">
                    <h4 className="title-section text-uppercase">Tất cả Phim</h4>
                </header>
                <div className="row row-sm">
                    {currentProducts.slice(0, 6).map(product => (
                    <div className="col-xl-2 col-lg-3 col-md-4 col-6">
                        <Link to={`/chi-tiet-san-pham/${product.id}`} className="card card-sm card-product-grid">
                            <a href="#" className="img-wrap">
                                {" "}
                                <img src={`images/products/${product.avatar}`} alt={product.name} />
                            </a>
                            <figcaption className="info-wrap">
                                <a href="#" className="title">
                                    {product.name}
                                </a>
                                <div className="price mt-1">{product.price}</div> {/* price-wrap.// */}
                            </figcaption>
                        </Link>
                    </div>

                    ))}
                </div>{" "}
                <ul className="pagination">
                    {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                        <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
                            <button onClick={() => paginate(index + 1)} className="page-link">
                                {index + 1}
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
}

export default RecommendedItem;