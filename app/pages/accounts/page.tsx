import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";
import TabBar from "@/app/components/tabBar";
import getAuth from "@/auth";
// import { sql } from "@vercel/postgres";
// import { redirect } from "next/navigation";

export default async function Accounts() {
  const auth = getAuth();
  const user = await auth.user();
  const subscription = await auth.subscription();

  //   async function create(formData: FormData) {
  //     "use server";
  //     const { rows } = await sql`
  //     INSERT INTO products (name)
  //     VALUES (${formData.get("name")})
  //   `;
  //     redirect(`/product/${rows[0].slug}`);
  //   }

  return (
    <>
      <Navbar user={user} />
      <TabBar subscription={subscription} activeTab={1} />

      <main className="flex min-h-screen flex-col items-center justify-start p-6 lg:p-24">
        <div>Accounts</div>

        {/* <form action={create}>
          <input type="text" name="name" />
          <button type="submit">Submit</button>
        </form> */}
      </main>

      <Footer />
    </>
  );
}
