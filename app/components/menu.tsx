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
import { useState } from "react";
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

  return (
    <>
      <Navbar
        user={user}
        subscription={subscription}
        setActivePage={setActivePage}
      />

      <main className="flex flex-1">
        <div className="flex-none w-64 h-screen fixed left-0 top-0 flex flex-col">
          <ul className="menu bg-gray-100 rounded-box w-56 flex-1 pt-24 flex flex-col">
            <li>
              <GuardButton
                condition={true}
                customFunction={setActivePage}
                customParameter="HOME"
                className=""
              >
                <FontAwesomeIcon icon={faHome} />
                Home
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
                Accounts
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
                Income Source
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
                Budget
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
                Budgeting Categories
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
                Reporting
              </GuardButton>
            </li>
          </ul>
        </div>

        <div className="flex-auto ml-64 bg-white px-4 py-10">
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
