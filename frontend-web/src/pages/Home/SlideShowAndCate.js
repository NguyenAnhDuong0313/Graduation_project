import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";

function SlideShowAndCate() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7071/api/Category')
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);
    return (
        <>
            <section className="section-main padding-y">
            <main className="card">
                    <div className="row">
                        {/* ================== COMPONENT SLIDER  BOOTSTRAP  ==================  */}
                        <div
                            id="carousel1_indicator"
                            className="slider-home-banner carousel slide"
                            data-ride="carousel"
                        >
                            <ol className="carousel-indicators">
                                <li
                                    data-target="#carousel1_indicator"
                                    data-slide-to={0}
                                    className="active"
                                />
                                <li data-target="#carousel1_indicator" data-slide-to={1} />
                                <li data-target="#carousel1_indicator" data-slide-to={2} />
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img src="images/banners/slide1.jpg" alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img src="images/banners/slide2.jpg" alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img src="images/banners/slide3.jpg" alt="Third slide" />
                                </div>
                            </div>
                            <a class="carousel-control-prev" href="#carousel1_indicator" role="button" data-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="sr-only">Previous</span>
                            </a>
                            <a class="carousel-control-next" href="#carousel1_indicator" role="button" data-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="sr-only">Next</span>
                            </a>

                        </div>
                        {/* ==================  COMPONENT SLIDER BOOTSTRAP end.// ==================  .// */}
                    </div>{" "}
                    {/* row.// */}                    {/* card-body.// */}
                </main>{" "}
                {/* card.// */}
            </section>
        </>
    );
}

export default SlideShowAndCate;