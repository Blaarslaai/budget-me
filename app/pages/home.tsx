"use client";

import PricingTable from "@/app/components/pricingTable";
import { faRankingStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { User, Subscription } from "@reflowhq/auth-next/types";
import { useEffect, useState } from "react";
import { GetAccounts, GetSubscriptionPlans } from "../serverCRUDActions";
import Loader from "../components/loader";

type props = {
  user: User | null;
  subscription: Subscription | null;
};

export default function Home({ user, subscription }: props) {
  const [plans, setPlans] = useState([] as any[]);
  const [accounts, setAccounts] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [netWorth, setNetWorth] = useState(0.0);

  useEffect(() => {
    setIsLoading(true);

    const getPlans = async () => {
      const plansData = await GetSubscriptionPlans();
      setPlans(plansData);
    };

    getPlans();
    getAccounts();

    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (accounts.length > 0) {
      const netWorth = accounts.reduce((accumulator: number, account: any) => {
        const balance = Number(account.balance);

        if (account.type === "Credit") {
          accumulator -= balance;
        } else if (account.type === "Debit") {
          accumulator += balance;
        }

        return accumulator;
      }, 0);

      console.log(netWorth);

      setNetWorth(netWorth);
    }
  }, [accounts]);

  const getAccounts = async () => {
    setIsLoading(true);
    const accounts = await GetAccounts();

    setAccounts(accounts);
    setIsLoading(false);
  };

  if (isLoading)
    return (
      <>
        <div className="flex justify-center">
          <Loader />
        </div>
      </>
    );

  return (
    <>
      {user ? (
        <div className="hero">
          <div className="hero-content text-center">
            <div className="max-w-3xl">
              <h1
                className="text-5xl font-bold"
                style={{ color: "rgba(51, 51, 51, 1)" }}
              >
                Welcome to your Dashboard
                <br />
                <br />
                <span style={{ color: "rgba(200, 92, 60, 1)" }}>
                  {user.name}
                </span>
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

            <PricingTable plans={plans} />
          </section>
        </>
      )}

      {subscription && (
        <>
          <section className="flex flex-col items-center gap-y-4">
            <h3 className="text-xl font-semibold">Your Financial Outlook</h3>
            <p className="max-w-lg text-center text-gray-700">
              {netWorth < 0 ? "Hang in there!" : "You are looking good!"}
            </p>

            {netWorth < 0 ? (
              <FontAwesomeIcon
                icon={faStarHalf}
                size="5x"
                style={{ color: "rgba(200, 92, 60, 1)" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faRankingStar}
                size="5x"
                style={{ color: "rgba(200, 92, 60, 1)" }}
              />
            )}

            <div>
              Your{" "}
              <div className="lg:tooltip" data-tip="All Debits minus Credit">
                <span
                  className="underline"
                  style={{ color: "rgba(200, 92, 60, 1)" }}
                >
                  Current
                </span>
              </div>{" "}
              NET Worth is: <strong>R</strong>{" "}
              <strong
                className={`${
                  netWorth > 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {netWorth}
              </strong>
            </div>
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
