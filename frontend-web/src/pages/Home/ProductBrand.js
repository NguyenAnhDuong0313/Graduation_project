import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductBrand() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        // Lấy danh sách các thương hiệu có sản phẩm
        axios.get('https://localhost:7071/api/Brand/brandshaveproduct')
            .then(response => {
                // Lặp qua danh sách thương hiệu và gọi API để lấy sản phẩm của từng thương hiệu
                const promises = response.data.map(brand => {
                    return axios.get(`https://localhost:7071/api/Brand/${brand.id}/products`)
                        .then(productResponse => {
                            return { ...brand, products: productResponse.data };
                        });
                });
                // Đợi tất cả các promises hoàn thành trước khi cập nhật state
                Promise.all(promises)
                    .then(updatedBrands => {
                        setBrands(updatedBrands);
                    })
                    .catch(error => {
                        console.error('Error fetching products for brands: ', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching brands data: ', error);
            });
    }, []);

    return (
        <>
            {brands.map(brand => (
                <section key={brand.id} className="padding-bottom">
                    <header className="section-heading heading-line">
                        <h4 className="title-section text-uppercase">{brand.name}</h4>
                    </header>
                    <div className="card card-home-category">
                        <div className="row no-gutters">
                            <div className="col-md-3">
                                <div className="home-category-banner bg-light-orange">
                                    <h5 className="title">{brand.description}</h5>
                                    <p>{brand.additionalInfo}</p>
                                    <a href="#" className="btn btn-outline-primary rounded-pill">
                                        Source now
                                    </a>
                                    <img src={`images/brands/${brand.avatar}`} className="img-bg" />
                                </div>
                            </div>
                            <div className="col-md-9">
                                <ul className="row no-gutters bordered-cols">
                                    {brand.products.slice(0,4).map(product => (
                                        <li key={product.id} className="col-6 col-lg-3 col-md-4">
                                            <Link to={`/chi-tiet-san-pham/${product.id}`} className="item">
                                                <div className="card-body">
                                                    <h6 className="title">{product.name}</h6>
                                                    <img
                                                        className="img-sm float-right"
                                                        src={`images/products/${product.avatar}`}
                                                    />
                                                    <p className="text-muted">
                                                        <i className="fa fa-map-marker-alt" /> {product.shortDes}
                                                    </p>
                                                </div>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            ))}
        </>
    );
}

export default ProductBrand;
