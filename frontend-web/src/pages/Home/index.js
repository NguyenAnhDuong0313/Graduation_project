import ChooseRegion from "./ChooseRegion";
import ProductBrand from "./ProductBrand";
import ProductDeal from "./ProductDeal";
import Quotation from "./Quotation";
import RecommendedItem from "./RecommendedItem";
import SlideShowAndCate from "./SlideShowAndCate";
import TradeService from "./TradeService";

function Home() {
    return (
        <>
            <div className="container">
                {/* ========================= SECTION MAIN  ========================= */}
                <SlideShowAndCate/>
                {/* ========================= SECTION MAIN END// ========================= */}
                {/* =============== SECTION DEAL =============== */}
                <ProductDeal/>
                {/* =============== SECTION DEAL // END =============== */}
                {/* =============== SECTION 1 =============== */}
                <ProductBrand/>
                {/* =============== SECTION 2 END =============== */}
                {/* =============== SECTION REQUEST =============== */}
                {/* =============== SECTION REQUEST .//END =============== */}
                {/* =============== SECTION ITEMS =============== */}
                <RecommendedItem/>
                {/* =============== SECTION ITEMS .//END =============== */}
                {/* =============== SECTION SERVICES =============== */}
                <TradeService/>
                {/* =============== SECTION SERVICES .//END =============== */}
                {/* =============== SECTION REGION =============== */}
                <ChooseRegion/>
                {/* =============== SECTION REGION .//END =============== */}
                <article className="my-4">
                    <img src="images/banners/ad-sm.png" className="w-100" />
                </article>
            </div>
            {/* container end.// */}
            {/* ========================= SECTION SUBSCRIBE  ========================= */}
            <section className="section-subscribe padding-y-lg">
                <div className="container">
                    <p className="pb-2 text-center text-white">
                        Delivering the latest product trends and industry news straight to your
                        inbox
                    </p>
                    <div className="row justify-content-md-center">
                        <div className="col-lg-5 col-md-6">
                            <form className="form-row">
                                <div className="col-md-8 col-7">
                                    <input
                                        className="form-control border-0"
                                        placeholder="Your Email"
                                        type="email"
                                    />
                                </div>{" "}
                                {/* col.// */}
                                <div className="col-md-4 col-5">
                                    <button type="submit" className="btn btn-block btn-warning">
                                        {" "}
                                        <i className="fa fa-envelope" /> Subscribe{" "}
                                    </button>
                                </div>{" "}
                                {/* col.// */}
                            </form>
                            <small className="form-text text-white-50">
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

export default Home;