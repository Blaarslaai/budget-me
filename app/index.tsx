import getAuth from "@/auth";
import Menu from "./components/menu";

export default async function Index() {
  const auth = getAuth();
  const user = await auth.user();
  const subscription = await auth.subscription();

  return (
    <div className="flex flex-col min-h-screen">
      <Menu user={user} subscription={subscription} />
    </div>
  );
}
