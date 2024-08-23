import React from "react";
import {
    MdHome,
} from "react-icons/md";
import { BiSolidCategoryAlt, BiSupport } from "react-icons/bi";
import { FaCartFlatbed, FaMoneyCheck, FaRocketchat, FaUser, FaUserGroup } from "react-icons/fa6";
import { CiImageOn, CiShoppingBasket } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import { IoIosRocket } from "react-icons/io";
import { BsFillHandIndexFill, BsTicketDetailed } from "react-icons/bs";
import Admin from "./Dashboard/Admin";
import Vendor from "./Dashboard/vendor/Vendor";
import Customer from "./Dashboard/customer/Customer";
import SingleCustomer from "./Dashboard/customer/SingleCustomer";
import Categories from "./Dashboard/categories/Categories";
import AddProduct from './Dashboard/products/AddProducts'
import Products from "./Dashboard/products/Products"
import AllOrder from "./Dashboard/order/AllOrder";
import VoucherAdminPanel from "./Dashboard/Voucher";
import SingleVendor from "./Dashboard/vendor/SingleVendor";
import RoleManager from "./Dashboard/RoleManager/RoleManager";
import AddRole from "./Dashboard/RoleManager/AddRole";
import AdManager from "./Dashboard/AdManager/index";
import CreateAd from "./Dashboard/AdManager/CreateAd";
import Finance from "./Dashboard/Finance/index";
import AddNewVoucher from "./Dashboard/Voucher/AddVoucher";
import EditCategory from "./components/Dashboard/Category/EditCategory";
import EditSubCategory from "./components/Dashboard/Category/EditSubCategory";
import Shipping from "./Dashboard/Shipment";
import ShippingManagement from "./Dashboard/Shipment/ShippingManagement";
import EditVoucher from "./Dashboard/Voucher/EditVoucher";
import EditProducts from "./Dashboard/products/EditProducts";
import EventManager from "./Dashboard/EventManager/index";
import CreateEvent from "./Dashboard/EventManager/CreateEvent";
import EditEvent from "./Dashboard/EventManager/EditEvent";
import EditPackage from "./Dashboard/AdManager/EditPackage";
import Supports from "./Dashboard/Support";
import SupportDetails from "./Dashboard/Support/SupportDetails";
import BannerImageUpload from "./Dashboard/BannerImageUpload/BannerImageUpload";
import UploadImage from "./Dashboard/BannerImageUpload/UploadImage";
import JoinEvents from "./Dashboard/EventManager/JoinEvents";

const menu = [
    {
        name: "Dashboard",
        layout: "/admin",
        path: "default",
        icon: <MdHome className="h-6 w-6" />,
        navMenu: true,
        component: <Admin />
    },
    {
        name: "Vendor",
        layout: "/admin",
        path: "vendor",
        icon: <FaUser className="h-6 w-6" />,
        navMenu: true,
        component: <Vendor />
    },
    {
        name: "Single Vendor",
        layout: "/admin",
        path: "vendor/:id",
        component: <SingleVendor />
    },
    {
        name: "Customer",
        layout: "/admin",
        path: "customer",
        navMenu: true,
        icon: <FaUserGroup className="h-6 w-6" />,
        component: <Customer />
    },
    {
        name: "Single Customer",
        layout: "/admin",
        path: "customer/:id",
        component: <SingleCustomer />
    },
    {
        name: "Categories",
        layout: "/admin",
        path: "categories",
        navMenu: true,
        icon: <BiSolidCategoryAlt className="h-6 w-6" />,
        component: <Categories />
    },
    {
        name: "Update Category",
        layout: "/admin",
        path: "edit-category/:id",
        component: <EditCategory />
    },
    {
        name: "Update Sub Category",
        layout: "/admin",
        path: "edit-sub-category/:id",
        component: <EditSubCategory />
    },
    {
        name: "Products",
        layout: "/admin",
        path: "products",
        navMenu: true,
        icon: <FaCartFlatbed className="h-6 w-6" />,
        component: <Products />
    },
    {
        name: "Add Product",
        layout: "/admin",
        path: "add-product",
        component: <AddProduct />
    },
    {
        name: "Edit Product",
        layout: "/admin",
        path: "edit-product/:id",
        component: <EditProducts />
    },
    {
        name: "Order & Review",
        layout: "/admin",
        path: "order-review",
        navMenu: true,
        icon: <CiShoppingBasket className="h-6 w-6" />,
        component: <AllOrder />
    },
    {
        name: "Finance",
        layout: "/admin",
        path: "finance",
        navMenu: true,
        icon: <FaMoneyCheck className="h-6 w-6" />,
        component: <Finance />
    },
    {
        name: "Shipment",
        layout: "/admin",
        path: "shipment",
        navMenu: true,
        icon: <ImLocation className="h-6 w-6" />,
        component: <Shipping />
    },
    {
        name: "Create Shipping",
        layout: "/admin",
        path: "create-shipping",
        component: <ShippingManagement />
    },
    {
        name: "Ad Manager",
        layout: "/admin",
        path: "ads-manager",
        navMenu: true,
        icon: <IoIosRocket className="h-6 w-6" />,
        component: <AdManager />
    },
    {
        name: "Create Ad",
        layout: "/admin",
        path: "create-ad",
        component: <CreateAd />
    },
    {
        name: "Edit Package",
        layout: "/admin",
        path: "edit-package/:id",
        component: <EditPackage />
    },
    {
        name: "Vouchers",
        layout: "/admin",
        path: "vouchers",
        navMenu: true,
        icon: <BsTicketDetailed className="h-6 w-6" />,
        component: <VoucherAdminPanel />
    },
    {
        name: "Add Voucher",
        layout: "/admin",
        path: "add-voucher",
        component: <AddNewVoucher />
    },
    {
        name: "Edit Voucher",
        layout: "/admin",
        path: "edit-voucher/:id",
        component: <EditVoucher />
    },
    {
        name: "Event Manager",
        layout: "/admin",
        path: "event-manager",
        navMenu: true,
        icon: <BsFillHandIndexFill className="h-6 w-6" />,
        component: <EventManager />
    },
    {
        name: "Join Event",
        layout: "/admin",
        path: "join-event/:id",
        component: <JoinEvents />
    },
    {
        name: "Create Event",
        layout: "/admin",
        path: "create-event",
        component: <CreateEvent />
    },
    {
        name: "Edit Event",
        layout: '/admin',
        path: "edit-event/:id",
        component: <EditEvent />
    },
    {
        name: "Message Center",
        layout: "/admin",
        icon: <FaRocketchat className="h-6 w-6" />,
        path: "message-center",
        navMenu: true,
    },
    {
        name: "Support",
        layout: "/admin",
        icon: <BiSupport className="h-6 w-6" />,
        path: "support",
        navMenu: true,
        component: <Supports />
    },
    {
        name: "Support Details",
        layout: "/admin",
        path: "support-details/:id",
        component: <SupportDetails />
    },
    {
        name: "Role Manager",
        layout: "/admin",
        icon: <FaUser className="h-6 w-6" />,
        path: "role-manager",
        navMenu: true,
        component: <RoleManager />
    },
    {
        name: "Banner Image",
        layout: "/admin",
        icon: <CiImageOn className="h-6 w-6" />,
        path: "banner-img",
        navMenu: true,
        component: <BannerImageUpload />
    },
    {
        name: "Banner Image Add",
        layout: "/admin",
        path: "banner-img-upload",
        component: <UploadImage />
    },
    {
        name: "Add Role Manager",
        layout: "/admin",
        path: "add-role",
        component: <AddRole />
    }

];
export default menu;
