"use client";

import { User } from "@reflowhq/auth-next/types";
import avatar from "../assets/avatar.png";

type props = {
  user: User | null;
};

export default function Navbar({ user }: props) {
  return (
    <div className="navbar bg-neutral text-neutral-content sticky top-0 z-50">
      <div className="navbar-start">
        <a href="/" className="btn btn-ghost text-xl">
          Budget Me
        </a>
      </div>
      <div className="navbar-center">{/* FUTURE CONTENT */}</div>
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
                <a className="justify-between" href="/pages/profile">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
