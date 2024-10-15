"use client";

import { Subscription, User } from "@reflowhq/auth-next/types";
import avatar from "../assets/avatar.png";
import LoginButton from "./loginButton";
import LogoutButton from "./logoutButton";
import Image from "next/image";
import { useEffect, useState } from "react";

type props = {
  user: User | null;
  subscription: Subscription | null;
  setActivePage: (page: string) => void;
};

export default function Navbar({ user, subscription, setActivePage }: props) {
  const [newProfile, setNewProfile] = useState(true);

  useEffect(() => {
    const timestamp = user?.created || 0;
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    // const formattedDate = date.toISOString().split("T")[0];

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight for accurate comparison

    // Calculate the date three days ago
    const threeDaysAgo = new Date(today);
    threeDaysAgo.setDate(today.getDate() - 3);

    // Check if the formatted date is older than three days
    const isOlderThanThreeDays = date < threeDaysAgo;

    setNewProfile(!isOlderThanThreeDays);
  }, [user]);

  return (
    <div
      className="navbar sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(217, 203, 160, 1)",
        color: "rgba(51, 51, 51, 1)",
      }}
    >
      <div className="navbar-start">
        <span className="text-xl">
          <strong>Budget Me</strong>
        </span>
      </div>
      <div className="navbar-center">
        {subscription ? subscription.plan.name : null}
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Avatar"
                src={user ? user.photo : avatar.src}
                width="100"
                height="100"
              />
            </div>
          </div>
          {user && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-teal-200 text-gray-900 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between hover:bg-gray-500"
                  onClick={() => setActivePage("PROFILE")}
                >
                  Profile
                  {newProfile && <span className="badge">New</span>}
                </a>
              </li>
              <li>
                <LogoutButton />
              </li>
            </ul>
          )}
          {!user && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <LoginButton />
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
