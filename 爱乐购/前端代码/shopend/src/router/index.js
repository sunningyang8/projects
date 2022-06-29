import { createRouter, createWebHistory } from "vue-router";
import authGuard from "@/router/authGuard";
const Cart = () => import("@/views/cart");
const Home = () => import("@/views/home");
const Commodity = () => import("@/views/commodity");
const My = () => import("@/views/my/index");
const Search = () => import("@/views/other/search");
const CartDetails = () => import("@/components/CartDetails");
const Error = () => import("@/views/other/404");
const Purchase = () => import("@/views/other/Purchase");
const CateGories = () => import("@/views/commodity/CateGories");
const Address = () => import("@/views/cart/Address");
const AddList = () => import("@/views/cart/AddList");
const Login = () => import("@/views/my/Logon");
const Register = () => import("@/views/my/Denglu");
const Logistics = () => import("@/views/other/Logistics");
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/cart/:id",
    name: "CartId",
    component: Cart,
  },
  {
    path: "/commodity",
    name: "Commodity",
    component: Commodity,
  },
  {
    path: "/my",
    name: "My",
    component: My,
  },
  {
    path: "/commodity/:id",
    name: "CateGories",
    component: CateGories,
  },
  //搜索
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  // 商品详情页面
  {
    path: "/cartgoods/:id",
    name: "CartDetails",
    component: CartDetails,
  },
  // 配送位置
  {
    path: "/address",
    name: "Address",
    component: Address,
  },
  //修改配送地址
  {
    path: "/addlist",
    name: "AddList",
    component: AddList,
  },
  //修改配送地址
  {
    path: "/addlist/:id",
    name: "AddListId",
    component: AddList,
  },
  //404页面
  {
    path: "/:catchAll(.*)",
    name: "Error",
    component: Error,
  },
  //购买页面
  {
    path: "/purchase",
    name: "Purchase",
    component: Purchase,
  },
  //注册页面
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  //登录页面
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  //物流
  {
    path: "/logistics/:id",
    name: "Logistics",
    component: Logistics,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,

});
router.beforeEach(authGuard);
export default router;
