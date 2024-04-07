import Cart from "../pages/Cart/Cart";
import Home from "../pages/Home";
import Payment from "../pages/Payment/Payment";
import ProductByCategory from "../pages/Product/ProductByCategory";
import ProductDetail from "../pages/Product/ProductDetail";
import Login from "../pages/User/Login";
import Register from "../pages/User/Register";
import SearchProduct from "../pages/Product/SearchProduct";

const RouterPublic = [
    { path: "/", component: Home },    
    { path: "/trang-chu", component: Home },
    { path: "/chi-tiet-san-pham/:id", component: ProductDetail},
    { path: "/danh-muc/:id", component: ProductByCategory},    
    { path: '/dang-nhap', component: Login},
    { path: '/dang-ky', component: Register},
    { path: '/gio-hang', component: Cart},
    { path: '/thanh-toan', component: Payment},
    { path: '/tim-kiem/', component: SearchProduct},
]
export default RouterPublic;