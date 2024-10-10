"use client";

// import PricingTable from "@/app/components/pricingTable";
import { User, Subscription } from "@reflowhq/auth-next/types";
import { useEffect, useState } from "react";

type props = {
  user: User | null;
  subscription: Subscription | null;
};

export default function Home({ user, subscription }: props) {
  // const [plans, setPlans] = useState([] as any[]);

  // useEffect(() => {
  //   const getPlans = async () => {
  //     const apiURL = process.env.NEXT_PUBLIC_REFLOW_TEST_MODE
  //       ? "https://test-api.reflowhq.com/v2"
  //       : "https://api.reflowhq.com/v2";

  //     console.log(apiURL);

  //     const requestUrl = `${apiURL}/projects/${process.env.NEXT_PUBLIC_REFLOW_PROJECT_ID}/plans/`;

  //     const response = await fetch(requestUrl, {
  //       cache: "reload",
  //     });

  //     const plansData = await (await response.json()).data;
  //     setPlans(plansData);

  //     console.log(plansData);
  //   };

  //   getPlans();
  // }, [user]);

  return (
    <>
      {user ? (
        <div className="hero bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold">
                Welcome to your Dashboard
                <br />
                <br />
                {user.name}
              </h1>
              <p className="py-6">
                Please use the menu to your left to navigate through the Budget
                Me+ platform.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="hero bg-base-200">
          <div className="hero-content text-center">
            <div className="max-w-lg">
              <h1 className="text-5xl font-bold">Welcome</h1>
              <p className="py-6">
                Please <strong>sign in</strong> or <strong>sign up</strong> for
                a profile to the Budget Me platform.
              </p>
            </div>
          </div>
        </div>
      )}

      <hr></hr>

      {!subscription && (
        <>
          <section className="flex flex-col items-center gap-y-4">
            <h3 className="text-xl font-semibold">Subscription Plans</h3>
            <p className="max-w-lg text-center text-gray-700">
              Select one of the plans and start a subscription.
            </p>

            {/* <PricingTable plans={plans} /> */}
          </section>
        </>
      )}

      {/* <section className="flex flex-col items-center gap-y-4">
        <div className="flex max-w-lg flex-wrap justify-center gap-4">
          <GuardButton condition={true}>Free Access</GuardButton>
          <GuardButton condition={!!user}>Auth Access</GuardButton>
          <GuardButton condition={!!subscription}>
            Subscriber Access
          </GuardButton>

          <GuardButton
            condition={subscription?.plan.parameters.access_level == "plus"}
          >
            Plus Plan Access
          </GuardButton>

          <GuardButton
            condition={subscription?.plan.parameters.access_level == "premium"}
          >
            Premium Plan Access
          </GuardButton>

          <GuardButton
            condition={subscription?.plan.parameters.access_level == "family"}
          >
            Family Plan Access
          </GuardButton>
        </div>
      </section> */}
    </>
  );
}
