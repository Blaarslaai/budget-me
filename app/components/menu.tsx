"use client";

import {
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
import { useEffect, useState } from "react";
import Home from "../pages/home";
import Accounts from "../pages/accounts";
import Income from "../pages/income";
import Budget from "../pages/budget";
import Categories from "../pages/categories";
import Settings from "../pages/settings";
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
          <ul className="menu bg-gray-100 rounded-box flex-1 pt-24 flex flex-col transition-all duration-300">
            <li>
              <button
                onClick={toggleMenu}
                className="p-2 bg-gray-200 rounded-md mb-2"
              >
                {isCollapsed ? "Expand" : "Collapse"}
              </button>
            </li>
            <li>
              <GuardButton
                condition={true}
                customFunction={setActivePage}
                customParameter="HOME"
                className=""
              >
                <FontAwesomeIcon icon={faHome} />
                {!isCollapsed && "Home"}
              </GuardButton>
            </li>
            <li>
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="ACCOUNTS"
                className=""
              >
                <FontAwesomeIcon icon={faFolder} />
                {!isCollapsed && "Accounts"}
              </GuardButton>
            </li>
            <li>
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="INCOME"
                className=""
              >
                <FontAwesomeIcon icon={faMoneyBill} />
                {!isCollapsed && "Income Source"}
              </GuardButton>
            </li>
            <li>
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="BUDGET"
                className=""
              >
                <FontAwesomeIcon icon={faChartLine} />
                {!isCollapsed && "Budget"}
              </GuardButton>
            </li>
            <li>
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="CATEGORIES"
                className=""
              >
                <FontAwesomeIcon icon={faDotCircle} />
                {!isCollapsed && "Budgeting Categories"}
              </GuardButton>
            </li>
            <li className="mt-auto pb-16">
              <GuardButton
                condition={!!user}
                customFunction={setActivePage}
                customParameter="REPORTING"
                className=""
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
          } bg-white px-4 py-10 transition-all duration-300`}
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
            ) : activePage === "SETTINGS" ? (
              <Settings />
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
