"use client";

import { Subscription, User } from "@reflowhq/auth-next/types";
import avatar from "../assets/avatar.png";
import LoginButton from "./loginButton";
import LogoutButton from "./logoutButton";

type props = {
  user: User | null;
  subscription: Subscription | null;
  setActivePage: (page: string) => void;
};

export default function Navbar({ user, subscription, setActivePage }: props) {
  return (
    <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50">
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
              <img alt="Avatar" src={user ? user.photo : avatar.src} />
            </div>
          </div>
          {user && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a
                  className="justify-between"
                  onClick={() => setActivePage("PROFILE")}
                >
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a onClick={() => setActivePage("SETTINGS")}>Settings</a>
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
