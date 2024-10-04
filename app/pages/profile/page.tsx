import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import ProfileForm from "./profileForm";
import getAuth from "@/auth";

export default async function Profile() {
  const auth = getAuth();
  const user = await auth.user();

  return (
    <>
      <Navbar user={user} />

      <main className="flex min-h-screen flex-col items-center justify-start p-6 lg:p-24">
        Profile Page
        <ProfileForm user={user} />
      </main>

      <Footer />
    </>
  );
}
