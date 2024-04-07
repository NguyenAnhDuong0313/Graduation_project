import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";

function ProductByCategory() {
    const [products, setProducts] = useState([]);
    const { id } = useParams();
    useEffect(() => {
        axios.get(`https://localhost:7071/api/Category/${id}/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, [id]);
    return (
        <>
            <section className="section-content padding-y">
                <div className="container">
                    {/* ============================  FILTER TOP  ================================= */}
                    <div className="card mb-3">
                        <div className="card-body">
                            <ol className="breadcrumb float-left">
                                <li className="breadcrumb-item">
                                    <a href="/trang-chu">Home</a>
                                </li>
                                <li className="breadcrumb-item active">ProductByCategory</li>
                            </ol>
                        </div>{" "}
                        {/* card-body .// */}
                    </div>{" "}
                    {/* card.// */}
                    {/* ============================ FILTER TOP END.// ================================= */}
                    <div className="row">
                        <aside className="col-md-2">
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_1"
                                    >
                                        {" "}
                                        Product type{" "}
                                    </a>
                                </h6>
                                <div
                                    className="filter-content collapse show"
                                    id="collapse_1"
                                    style={{}}
                                >
                                    <div className="inner">
                                        <ul className="list-menu">
                                            <li>
                                                <a href="#">Shorts</a>
                                            </li>
                                            <li>
                                                <a href="#">Trousers </a>
                                            </li>
                                            <li>
                                                <a href="#">Sweaters</a>
                                            </li>
                                            <li>
                                                <a href="#">Clothes</a>
                                            </li>
                                            <li>
                                                <a href="#">Home items </a>
                                            </li>
                                            <li>
                                                <a href="#">Jackats</a>
                                            </li>
                                            <li>
                                                <a href="#">Somethings </a>
                                            </li>
                                        </ul>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group  .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_2"
                                    >
                                        {" "}
                                        Brands{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_2">
                                    <div className="inner">
                                        <label className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                defaultChecked=""
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">
                                                Adidas
                                                <b className="badge badge-pill badge-light float-right">
                                                    120
                                                </b>
                                            </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                defaultChecked=""
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">
                                                Nike
                                                <b className="badge badge-pill badge-light float-right">
                                                    15
                                                </b>
                                            </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                defaultChecked=""
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">
                                                The Noth Face
                                                <b className="badge badge-pill badge-light float-right">
                                                    35
                                                </b>{" "}
                                            </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input
                                                type="checkbox"
                                                defaultChecked=""
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">
                                                The cat
                                                <b className="badge badge-pill badge-light float-right">
                                                    89
                                                </b>{" "}
                                            </div>
                                        </label>
                                        <label className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" />
                                            <div className="custom-control-label">
                                                Honda
                                                <b className="badge badge-pill badge-light float-right">
                                                    30
                                                </b>
                                            </div>
                                        </label>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_3"
                                    >
                                        {" "}
                                        Price range{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_3">
                                    <div className="inner">
                                        <input
                                            type="range"
                                            className="custom-range"
                                            min={0}
                                            max={100}
                                            name=""
                                        />
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label>Min</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="$0"
                                                    type="number"
                                                />
                                            </div>
                                            <div className="form-group text-right col-md-6">
                                                <label>Max</label>
                                                <input
                                                    className="form-control"
                                                    placeholder="$1,0000"
                                                    type="number"
                                                />
                                            </div>
                                        </div>{" "}
                                        {/* form-row.// */}
                                        <button className="btn btn-block btn-primary">Apply</button>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_4"
                                    >
                                        {" "}
                                        Sizes{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_4">
                                    <div className="inner">
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> XS </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> SM </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> LG </span>
                                        </label>
                                        <label className="checkbox-btn">
                                            <input type="checkbox" />
                                            <span className="btn btn-light"> XXL </span>
                                        </label>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group .// */}
                            <article className="filter-group">
                                <h6 className="title">
                                    <a
                                        href="#"
                                        className="dropdown-toggle"
                                        data-toggle="collapse"
                                        data-target="#collapse_5"
                                    >
                                        {" "}
                                        Condition{" "}
                                    </a>
                                </h6>
                                <div className="filter-content collapse show" id="collapse_5">
                                    <div className="inner">
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                defaultChecked=""
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Any condition</div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Brand new </div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Used items</div>
                                        </label>
                                        <label className="custom-control custom-radio">
                                            <input
                                                type="radio"
                                                name="myfilter_radio"
                                                className="custom-control-input"
                                            />
                                            <div className="custom-control-label">Very old</div>
                                        </label>
                                    </div>{" "}
                                    {/* inner.// */}
                                </div>
                            </article>{" "}
                            {/* filter-group .// */}
                        </aside>{" "}
                        {/* col.// */}
                        <main className="col-md-10">
                            <header className="mb-3">
                                <div className="form-inline">
                                    <strong className="mr-md-auto">32 Items found </strong>
                                    <select className="mr-2 form-control">
                                        <option>Latest items</option>
                                        <option>Trending</option>
                                        <option>Most Popular</option>
                                        <option>Cheapest</option>
                                    </select>
                                    <div className="btn-group">
                                        <a
                                            href="page-listing-grid.html"
                                            className="btn btn-light"
                                            data-toggle="tooltip"
                                            title="List view"
                                        >
                                            <i className="fa fa-bars" />
                                        </a>
                                        <a
                                            href="page-listing-large.html"
                                            className="btn btn-light active"
                                            data-toggle="tooltip"
                                            title="Grid view"
                                        >
                                            <i className="fa fa-th" />
                                        </a>
                                    </div>
                                </div>
                            </header>
                            {/* sect-heading */}

                            {products.map(product => (
                                <article className="card card-product-list" key={product.id}>
                                    <div className="row no-gutters">
                                        <aside className="col-md-3">
                                            <Link to={`/chi-tiet-san-pham/${product.id}`} className="img-wrap">
                                                <img src={`../images/products/${product.avatar}`} alt={product.name} />
                                            </Link>
                                        </aside>{" "}
                                        {/* col.// */}
                                        <div className="col-md-6">
                                            <div className="info-main">
                                                <Link to={`/chi-tiet-san-pham/${product.id}`} className="h5 title">
                                                    {" "}
                                                    {product.name}
                                                </Link>
                                                <div className="rating-wrap mb-2">
                                                    <ul className="rating-stars">
                                                        <li style={{ width: "80%" }} className="stars-active">
                                                            <i className="fa fa-star" />{" "}
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />{" "}
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                        </li>
                                                        <li>
                                                            <i className="fa fa-star" />{" "}
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />{" "}
                                                            <i className="fa fa-star" />
                                                            <i className="fa fa-star" />
                                                        </li>
                                                    </ul>
                                                    <div className="label-rating">7/10</div>
                                                </div>{" "}
                                                {/* rating-wrap.// */}
                                                <p className="mb-3">
                                                    <span className="tag">
                                                        {" "}
                                                        <i className="fa fa-check" /> Verified
                                                    </span>
                                                    <span className="tag"> 2 Years </span>
                                                    <span className="tag"> 30 reviews </span>
                                                    <span className="tag"> Japan </span>
                                                </p>
                                                <p>
                                                    {" "}
                                                    {product.fullDescription}{" "}
                                                </p>
                                            </div>{" "}
                                            {/* info-main.// */}
                                        </div>{" "}
                                        {/* col.// */}
                                        <aside className="col-sm-3">
                                            <div className="info-aside">
                                                <div className="price-wrap">
                                                    <span className="h5 price">{product.price}</span>
                                                    <small className="text-muted">/per item</small>
                                                </div>{" "}
                                                {/* price-wrap.// */}
                                                <small className="text-success">Free shipping</small>
                                                <p className="text-muted mt-3">Guangzhou textile Ltd</p>
                                                <p className="mt-3">
                                                    <a href="#" className="btn btn-outline-primary">
                                                        {" "}
                                                        <i className="fa fa-envelope" /> Contact supplier{" "}
                                                    </a>
                                                    <a href="#" className="btn btn-light">
                                                        <i className="fa fa-heart" /> Save{" "}
                                                    </a>
                                                </p>
                                                <label className="custom-control mt-3 custom-checkbox">
                                                    <input type="checkbox" className="custom-control-input" />
                                                    <div className="custom-control-label">Add to compare</div>
                                                </label>
                                            </div>{" "}
                                            {/* info-aside.// */}
                                        </aside>{" "}
                                        {/* col.// */}
                                    </div>{" "}
                                    {/* row.// */}
                                </article>
                            ))}
                            <nav className="mb-4" aria-label="Page navigation sample">
                                <ul className="pagination">
                                    <li className="page-item disabled">
                                        <a className="page-link" href="#">
                                            Previous
                                        </a>
                                    </li>
                                    <li className="page-item active">
                                        <a className="page-link" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            3
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            4
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            5
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            Next
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                            <div className="box text-center">
                                <p>Did you find what you were looking for？</p>
                                <a href="" className="btn btn-light">
                                    Yes
                                </a>
                                <a href="" className="btn btn-light">
                                    No
                                </a>
                            </div>
                        </main>{" "}
                        {/* col.// */}
                    </div>
                </div>{" "}
                {/* container .//  */}
            </section>
            {/* ========================= SECTION CONTENT END// ========================= */}
            {/* ========================= SECTION SUBSCRIBE  ========================= */}
            <section className="padding-y-lg bg-light border-top">
                <div className="container">
                    <p className="pb-2 text-center">
                        Delivering the latest product trends and industry news straight to your
                        inbox
                    </p>
                    <div className="row justify-content-md-center">
                        <div className="col-lg-4 col-sm-6">
                            <form className="form-row">
                                <div className="col-8">
                                    <input
                                        className="form-control"
                                        placeholder="Your Email"
                                        type="email"
                                    />
                                </div>{" "}
                                {/* col.// */}
                                <div className="col-4">
                                    <button type="submit" className="btn btn-block btn-warning">
                                        {" "}
                                        <i className="fa fa-envelope" /> Subscribe{" "}
                                    </button>
                                </div>{" "}
                                {/* col.// */}
                            </form>
                            <small className="form-text">
                                We’ll never share your email address with a third-party.{" "}
                            </small>
                        </div>{" "}
                        {/* col-md-6.// */}
                    </div>
                </div>
            </section>
        </>

    );
}

export default ProductByCategory;