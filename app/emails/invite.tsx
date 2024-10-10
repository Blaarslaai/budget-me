import Image from "next/image";
import icon from "../assets/dollar.png";

export function InviteEmailTemplate(email: string): import("react").ReactNode {
  return (
    <html>
      <div className="flex justify-center">
        <Image
          src={icon.src}
          alt="Logo"
          title="Logo"
          className="block"
          width="200"
          height="200"
        />
      </div>
      <p>Hello {email}</p>
      <p>
        You have been invited to sign up for a free account with{" "}
        <strong>Budget Me+</strong>
      </p>
      <p>
        <a href="http://localhost:3000/">Register Here</a>
      </p>
      <p>
        Best regards,
        <br />
        The Budget Me+ Team
      </p>
    </html>
  );
}
