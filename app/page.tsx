import getAuth from "@/auth";
import PricingTable from "./components/pricingTable";
import LogoutButton from "./components/logoutButton";
import UnsubscribeButton from "./components/unsubscribeButton";
import GuardButton from "./components/guardButton";
import LoginButton from "./components/loginButton";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import TabBar from "./components/tabBar";

export default async function Home() {
  const auth = getAuth();
  const user = await auth.user();
  const subscription = await auth.subscription();

  async function getPlans() {
    "use server";

    const apiURL = process.env.REFLOW_TEST_MODE
      ? "https://test-api.reflowhq.com/v2"
      : "https://api.reflowhq.com/v2";

    const requestUrl = `${apiURL}/projects/${process.env.REFLOW_PROJECT_ID}/plans/`;

    const response = await fetch(requestUrl, {
      cache: "force-cache",
    });

    return response.json();
  }

  const plans = (await getPlans()).data;

  return (
    <>
      <Navbar user={user} />
      <TabBar subscription={subscription} activeTab={0} />

      <main className="flex min-h-screen flex-col items-center justify-start p-6 lg:p-24">
        <div className="relative flex w-full max-w-3xl flex-col items-center border bg-white px-4 py-16 text-left">
          <div className="flex flex-col gap-y-12">
            <section className="flex flex-col items-center gap-y-4 text-center">
              <h3 className="text-xl font-semibold">
                Auth & Subscription Status
              </h3>
              <p className="max-w-md text-center text-gray-700">
                Here we display information about the user based on their
                authentication and subscription status.
              </p>

              <p>
                <b>Auth status:</b>{" "}
                {user ? (
                  <>
                    Signed in as {user.name}.
                    <LogoutButton />
                  </>
                ) : (
                  <>
                    You are not signed in.
                    <LoginButton />
                  </>
                )}
              </p>

              <p>
                <b>Subscription status:</b>{" "}
                {subscription ? (
                  <>
                    Subscribed to {subscription.plan.name}.
                    <UnsubscribeButton />
                  </>
                ) : (
                  <>You are not subscribed.</>
                )}
              </p>
            </section>

            {!subscription && (
              <>
                <hr></hr>
                <section className="flex flex-col items-center gap-y-4">
                  <h3 className="text-xl font-semibold">Subscription Plans</h3>
                  <p className="max-w-lg text-center text-gray-700">
                    Select one of the plans and start a subscription.
                  </p>

                  <PricingTable plans={plans} />
                </section>
              </>
            )}
            <hr></hr>

            <section className="flex flex-col items-center gap-y-4">
              <h3 className="text-xl font-semibold">Guarded Actions</h3>
              <p className="max-w-md text-center text-gray-700">
                Depending on the user&lsquo;s auth and subscription status, only
                some of the buttons will be available.
              </p>

              <div className="flex max-w-lg flex-wrap justify-center gap-4">
                <GuardButton condition={true}>Free Access</GuardButton>
                <GuardButton condition={!!user}>Auth Access</GuardButton>
                <GuardButton condition={!!subscription}>
                  Subscriber Access
                </GuardButton>

                <GuardButton
                  condition={
                    subscription?.plan.parameters.access_level == "plus"
                  }
                >
                  Plus Plan Access
                </GuardButton>

                <GuardButton
                  condition={
                    subscription?.plan.parameters.access_level == "premium"
                  }
                >
                  Premium Plan Access
                </GuardButton>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
