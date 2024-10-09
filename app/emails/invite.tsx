import icon from "../assets/dollar.png";

export function InviteEmailTemplate(email: string): import("react").ReactNode {
  return (
    <html>
      <div className="flex justify-center">
        <img src={icon.src} alt="Logo" />
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
