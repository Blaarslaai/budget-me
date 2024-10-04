"use client";

import {
  faChrome,
  faFacebook,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faComputer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className="footer bg-neutral text-neutral-content items-center p-4 sticky bottom-0 z-50">
      <aside className="grid-flow-col items-center">
        <FontAwesomeIcon icon={faComputer} />
        <p>
          Astral Computers (Pty) Ltd | Copyright © {new Date().getFullYear()} -
          All right reserved
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://astral-computers.vercel.app/" target="_blank">
          <FontAwesomeIcon icon={faChrome} />
        </a>
        <a
          href="https://www.linkedin.com/company/astral-computers-za"
          target="_blank"
        >
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </nav>
    </footer>
  );
}
