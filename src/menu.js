import React from "react";
import {
    MdHome,
} from "react-icons/md";
import { BiSolidCategoryAlt, BiSupport } from "react-icons/bi";
import { FaCartFlatbed, FaMoneyCheck, FaRocketchat, FaUser } from "react-icons/fa6";
import { CiShoppingBasket } from "react-icons/ci";
import { ImLocation } from "react-icons/im";
import { IoIosRocket } from "react-icons/io";
import { BsFillHandIndexFill, BsTicketDetailed } from "react-icons/bs";
import Admin from "./Dashboard/Admin";
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
    },
    {
        name: "Customer",
        layout: "/admin",
        path: "customer",
    },
    {
        name: "Categories",
        layout: "/admin",
        path: "categories",
        navMenu: true,
        icon: <BiSolidCategoryAlt className="h-6 w-6" />,
    },
    {
        name: "Products",
        layout: "/admin",
        path: "products",
        navMenu: true,
        icon: <FaCartFlatbed className="h-6 w-6" />,
    },

    {
        name: "Order & Review",
        layout: "/admin",
        path: "order-review",
        navMenu: true,
        icon: <CiShoppingBasket className="h-6 w-6" />,
    },
    {
        name: "Finance",
        layout: "/admin",
        path: "finance",
        navMenu: true,
        icon: <FaMoneyCheck className="h-6 w-6" />,
    },
    {
        name: "Shipment",
        layout: "/admin",
        path: "shipment",
        navMenu: true,
        icon: <ImLocation className="h-6 w-6" />,
    },
    {
        name: "Ads Manager",
        layout: "/admin",
        path: "ads-manager",
        navMenu: true,
        icon: <IoIosRocket className="h-6 w-6" />,
    },

    {
        name: "Vouchers",
        layout: "/admin",
        path: "vouchers",
        navMenu: true,
        icon: <BsTicketDetailed className="h-6 w-6" />,
    },
    {
        name: "Event Manager",
        layout: "/admin",
        path: "event-manager",
        navMenu: true,
        icon: <BsFillHandIndexFill className="h-6 w-6" />,
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
        path: "message-center",
        navMenu: true,
    },

];
export default menu;
