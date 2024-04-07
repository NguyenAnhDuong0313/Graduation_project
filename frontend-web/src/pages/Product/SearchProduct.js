import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function SearchProduct() {
	const location = useLocation();
	const [products, setProducts] = useState([]);
	const queryParams = new URLSearchParams(location.search);
	const keyword = queryParams.get('keyword');

	useEffect(() => {
		if (keyword) {
			axios.get(`https://localhost:7071/api/Search/search?keyword=${encodeURIComponent(keyword)}`)
				.then(response => {
					setProducts(response.data);
				})
				.catch(error => {
					console.error('Error fetching products:', error);
				});
		}
	}, [keyword, location.search]);
	return (
		<>

			<section class="section-content padding-y">
				<div class="container">


					<div class="card mb-3">
						<div class="card-body">
							<div class="row">
								<div class="col-md-2"> Your are here: </div>
								<nav class="col-md-8">
									<ol class="breadcrumb">
										<li class="breadcrumb-item"><a href="#">Home</a></li>
										<li class="breadcrumb-item"><a href="#">Category name</a></li>
										<li class="breadcrumb-item"><a href="#">Sub category</a></li>
										<li class="breadcrumb-item active" aria-current="page">Items</li>
									</ol>
								</nav>
							</div>

							<div class="row">
								<div class="col-md-2">Filter by</div>
								<div class="col-md-10">
									<ul class="list-inline">
										<li class="list-inline-item mr-3 dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown">   Supplier type </a>
											<div class="dropdown-menu p-3" style={{ maxWidth: '400px' }}>

												<label class="form-check">
													<input type="radio" name="myfilter" class="form-check-input" /> Good supplier
												</label>
												<label class="form-check">
													<input type="radio" name="myfilter" class="form-check-input" /> Best supplier
												</label>
												<label class="form-check">
													<input type="radio" name="myfilter" class="form-check-input" /> New supplier
												</label>
											</div>
										</li>
										<li class="list-inline-item mr-3 dropdown">
											<a href="#" class="dropdown-toggle" data-toggle="dropdown">  Country </a>
											<div class="dropdown-menu p-3">
												<label class="form-check"> 	 <input type="checkbox" class="form-check-input" /> China    </label>
												<label class="form-check">   	 <input type="checkbox" class="form-check-input" /> Japan      </label>
												<label class="form-check">    <input type="checkbox" class="form-check-input" /> Uzbekistan  </label>
												<label class="form-check">  <input type="checkbox" class="form-check-input" /> Russia     </label>
											</div>
										</li>
										<li class="list-inline-item mr-3 dropdown">
											<a href="#" class="dropdown-toggle" data-toggle="dropdown">Feature</a>
											<div class="dropdown-menu">
												<a href="" class="dropdown-item">Anti backterial</a>
												<a href="" class="dropdown-item">With buttons</a>
												<a href="" class="dropdown-item">Extra safety</a>
											</div>
										</li>
										<li class="list-inline-item mr-3"><a href="#">Color</a></li>
										<li class="list-inline-item mr-3"><a href="#">Size</a></li>
										<li class="list-inline-item mr-3">
											<div class="form-inline">
												<label class="mr-2">Price</label>
												<input class="form-control form-control-sm" placeholder="Min" type="number" />
												<span class="px-2"> - </span>
												<input class="form-control form-control-sm" placeholder="Max" type="number" />
												<button type="submit" class="btn btn-sm btn-light ml-2">Ok</button>
											</div>
										</li>
										<li class="list-inline-item mr-3">
											<label class="custom-control mt-1 custom-checkbox">
												<input type="checkbox" class="custom-control-input" />
												<div class="custom-control-label">Ready to ship
												</div>
											</label>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>

					<header class="mb-3">
						<div class="form-inline">
							<strong class="mr-md-auto">32 Items found </strong>
							<select class="mr-2 form-control">
								<option>Latest items</option>
								<option>Trending</option>
								<option>Most Popular</option>
								<option>Cheapest</option>
							</select>
							<div class="btn-group">
								<a href="page-listing-grid.html" class="btn btn-light active" data-toggle="tooltip" title="List view">
									<i class="fa fa-bars"></i></a>
								<a href="page-listing-large.html" class="btn btn-light" data-toggle="tooltip" title="Grid view">
									<i class="fa fa-th"></i></a>
							</div>
						</div>
					</header>

					<div class="row">
						{products.map(product => (
							<div key={product.id} className="col-md-3">
								<figure className="card card-product-grid">
									<div className="img-wrap">
										<span className="badge badge-danger"> NEW </span>
										<Link to={`/chi-tiet-san-pham/${product.id}`} className="img-wrap">
											<img src={"../images/products/" + product.avatar} alt={product.name} />
										</Link>
									</div>
									<figcaption className="info-wrap">
										<a href="#" className="title mb-2">{product.name}</a>
										<div className="price-wrap">
											<span className="price">{product.price.toLocaleString('vi-VN')}đ</span>
										</div>
										<p className="mb-2">{product.quantity} Pieces <small className="text-muted">(Min Order)</small></p>
										<p className="text-muted">{product.supplier}</p>
										<p className="mb-3">
											<span className="tag"><i className="fa fa-check"></i> Verified</span>
											<span className="tag">{product.reviews} reviews</span>
											<span className="tag">{product.country}</span>
										</p>
										<label className="custom-control mb-3 custom-checkbox">
											<input type="checkbox" className="custom-control-input" />
											<div className="custom-control-label">Add to compare</div>
										</label>
										<a href="#" className="btn btn-outline-primary"> <i className="fa fa-envelope"></i> Contact supplier </a>
									</figcaption>
								</figure>
							</div>
						))}
					</div>


					<nav class="mb-4" aria-label="Page navigation sample">
						<ul class="pagination">
							<li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
							<li class="page-item active"><a class="page-link" href="#">1</a></li>
							<li class="page-item"><a class="page-link" href="#">2</a></li>
							<li class="page-item"><a class="page-link" href="#">3</a></li>
							<li class="page-item"><a class="page-link" href="#">4</a></li>
							<li class="page-item"><a class="page-link" href="#">5</a></li>
							<li class="page-item"><a class="page-link" href="#">Next</a></li>
						</ul>
					</nav>


					<div class="box text-center">
						<p>Did you find what you were looking for？</p>
						<a href="" class="btn btn-light">Yes</a>
						<a href="" class="btn btn-light">No</a>
					</div>

				</div>
			</section>



		</>

	);
}

export default SearchProduct;