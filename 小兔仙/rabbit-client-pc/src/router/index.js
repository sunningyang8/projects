import { createRouter, createWebHashHistory } from "vue-router";
import authGuard from "@/router/authGuard";
const HomePage = () => import("@/views/home/HomePage");
const TopCategoryPage = () => import("@/views/category/TopCategoryPage");
const SubCategoryPage = () => import("@/views/category/SubCategoryPage");
const GoodsDetailPage = () => import("@/views/goods/GoodsDetailPage");
const LoginPage = () => import("@/views/login/LoginPage");
const LoginCallbackPage = import("@/views/login/LoginCallbackPage");
const CartPage = () => import("@/views/cart/CartPage");
const CheckoutPage = () => import("@/views/pay/CheckoutPage");
const PayPage = () => import("@/views/pay/PayPage");
const PayResultPage = () => import("@/views/pay/PayResultPage");
const MemberHomePage = () => import("@/views/member/home/MemberHomePage");
const OrderListPage = () => import("@/views/member/order/OrderListPage");
const OrderDetailPage = () => import("@/views/member/order/OrderDetailPage");
const OrderView = () => import("@/views/member/order/OrderView");

const routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/category/:id",
    component: TopCategoryPage,
  },
  {
    path: "/category/sub/:id",
    component: SubCategoryPage,
  },
  {
    path: "/goods/:id",
    component: GoodsDetailPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/login/callback",
    component: LoginCallbackPage,
  },
  {
    path: "/cart",
    component: CartPage,
  },
  {
    path: "/checkout/order",
    component: CheckoutPage,
  },
  {
    path: "/checkout/pay",
    component: PayPage,
  },
  {
    path: "/pay/callback",
    component: PayResultPage,
  },
  {
    path: "/member/home",
    component: MemberHomePage,
  },
  {
    path: "/member/order",
    component: OrderView,
    children: [
      {
        path: "",
        component: OrderListPage,
      },
      {
        path: ":id",
        component: OrderDetailPage,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes,
  linkActiveClass: "fuzzy-active",
  linkExactActiveClass: "exact-active",
});

router.beforeEach(authGuard);

export default router;
