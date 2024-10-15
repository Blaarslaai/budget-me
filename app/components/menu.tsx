"use client";

import {
  faArrowLeft,
  faArrowRight,
  faChartLine,
  faDotCircle,
  faFile,
  faFolder,
  faHome,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Footer from "./footer";
import Navbar from "./navbar";
import { Subscription, User } from "@reflowhq/auth-next/types";
import { useState } from "react";
import Home from "../pages/home";
import Accounts from "../pages/accounts";
import Income from "../pages/income";
import Budget from "../pages/budget";
import Categories from "../pages/categories";
import Profile from "../pages/profile";
import Reporting from "../pages/reporting";
import GuardButton from "./guardButton";

type props = {
  user: User | null;
  subscription: Subscription | null;
};

export default function Menu({ user, subscription }: props) {
  const [activePage, setActivePage] = useState("HOME");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <Navbar
        user={user}
        subscription={subscription}
        setActivePage={setActivePage}
      />

      <main className="flex flex-1">
        <div
          className={`flex-none h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 ${
            isCollapsed ? "w-20" : "w-64"
          }`}
        >
          <ul
            className="menu rounded-box flex-1 pt-24 flex flex-col transition-all duration-300"
            style={{ backgroundColor: "rgba(250, 243, 224, 1)" }}
          >
            <li>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md mb-2 flex justify-end hover:bg-gray-100 focus:bg-gray-100"
              >
                {isCollapsed ? (
                  <FontAwesomeIcon icon={faArrowRight} />
                ) : (
                  <FontAwesomeIcon icon={faArrowLeft} />
                )}
              </button>
            </li>
            <li
              className={`bg-teal-50 rounded-md mb-2 flex flex-col w-full focus:bg-teal-50 hover:bg-teal-50 ${
                isCollapsed && "content-center"
              }`}
              style={{ color: "rgba(51, 51, 51, 1)" }}
            >
              <GuardButton
                condition={true}
                customFunction={setActivePage}
                customParameter="HOME"
                className={`${
                  activePage === "HOME" && "bg-teal-50"
                } focus:bg-teal-50`}
              >
                <FontAwesomeIcon icon={faHome} />
                {!isCollapsed && "Home"}
              </GuardButton>
            </li>
            <li
              className={`bg-teal-50 rounded-md mb-2 flex flex-col w-full focus:bg-teal-50 hover:bg-teal-50 ${
                isCollapsed && "content-center"
              }`}
              style={{ color: "rgba(51, 51, 51, 1)" }}
            >
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="ACCOUNTS"
                className={`${
                  activePage === "ACCOUNTS" && "bg-teal-50"
                } focus:bg-teal-50`}
              >
                <FontAwesomeIcon icon={faFolder} />
                {!isCollapsed && "Accounts"}
              </GuardButton>
            </li>
            <li
              className={`bg-teal-50 rounded-md mb-2 flex flex-col w-full focus:bg-teal-50 hover:bg-teal-50 ${
                isCollapsed && "content-center"
              }`}
              style={{ color: "rgba(51, 51, 51, 1)" }}
            >
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="INCOME"
                className={`${
                  activePage === "INCOME" && "bg-teal-50"
                } focus:bg-teal-50`}
              >
                <FontAwesomeIcon icon={faMoneyBill} />
                {!isCollapsed && "Income Source"}
              </GuardButton>
            </li>
            <li
              className={`bg-teal-50 rounded-md mb-2 flex flex-col w-full focus:bg-teal-50 hover:bg-teal-50 ${
                isCollapsed && "content-center"
              }`}
              style={{ color: "rgba(51, 51, 51, 1)" }}
            >
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="BUDGET"
                className={`${
                  activePage === "BUDGET" && "bg-teal-50"
                } focus:bg-teal-50`}
              >
                <FontAwesomeIcon icon={faChartLine} />
                {!isCollapsed && "Budget"}
              </GuardButton>
            </li>
            <li
              className={`bg-teal-50 rounded-md mb-2 flex flex-col w-full focus:bg-teal-50 hover:bg-teal-50 ${
                isCollapsed && "content-center"
              }`}
              style={{ color: "rgba(51, 51, 51, 1)" }}
            >
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="CATEGORIES"
                className={`${
                  activePage === "CATEGORIES" && "bg-teal-50"
                } focus:bg-teal-50`}
              >
                <FontAwesomeIcon icon={faDotCircle} />
                {!isCollapsed && "Budgeting Categories"}
              </GuardButton>
            </li>
            <li
              className={`bg-teal-50 mt-auto mb-16 rounded-md flex flex-col focus:bg-teal-50 hover:bg-teal-50 ${
                isCollapsed && "content-center"
              }`}
              style={{ color: "rgba(51, 51, 51, 1)" }}
            >
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="REPORTING"
                className={`${
                  activePage === "REPORTING" && "bg-teal-50"
                } focus:bg-teal-50`}
              >
                <FontAwesomeIcon icon={faFile} />
                {!isCollapsed && "Reporting"}
              </GuardButton>
            </li>
          </ul>
        </div>

        <div
          className={`flex-auto ${
            isCollapsed ? "ml-20" : "ml-64"
          } px-4 py-10 transition-all duration-300 bg-white`}
        >
          <div className="flex flex-col gap-y-12">
            {activePage === "HOME" ? (
              <Home user={user} subscription={subscription} />
            ) : activePage === "ACCOUNTS" ? (
              <Accounts />
            ) : activePage === "INCOME" ? (
              <Income />
            ) : activePage === "BUDGET" ? (
              <Budget />
            ) : activePage === "CATEGORIES" ? (
              <Categories />
            ) : activePage === "PROFILE" ? (
              <Profile user={user} subscription={subscription} />
            ) : activePage === "REPORTING" ? (
              <Reporting />
            ) : null}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
