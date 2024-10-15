"use client";

import { useState, useEffect, useRef } from "react";
import {
  CreateBudgetSource,
  DeleteBudgetSource,
  GetAccounts,
  GetBudgetSources,
  GetCategories,
  GetCustomCategories,
} from "../serverCRUDActions";
import Loader from "../components/loader";
import Toast from "../components/toast";

export default function Budget() {
  const [accounts, setAccounts] = useState([] as any);
  const [categories, setCategories] = useState([] as any);
  const [budget, setBudget] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [netWorth, setNetWorth] = useState(0.0);

  let debounceTimeout: NodeJS.Timeout | null = null;

  const formRef = useRef<HTMLFormElement>(null);

  const create = async (formData: FormData) => {
    await CreateBudgetSource(
      formData.get("account") as unknown as number,
      formData.get("source") as string,
      formData.get("description") as string,
      formData.get("amount") as unknown as number,
      formData.get("date") as unknown as Date
    );
    loadValues();

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleDelete = async (source: any) => {
    setIsDeleting(true);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    await DeleteBudgetSource(source.id, source.amount, source.accountid);

    debounceTimeout = setTimeout(async () => {
      loadValues();
      setIsDeleting(false);
    }, 2500);
  };

  const get = async () => {
    setIsLoading(true);
    const budget = await GetBudgetSources();

    setBudget(budget);
    setIsLoading(false);
  };

  const getAccounts = async () => {
    setIsLoading(true);
    const accounts = await GetAccounts();

    setAccounts(accounts);
    setIsLoading(false);
  };

  const getCategories = async () => {
    setIsLoading(true);
    const categories = await GetCategories();
    const customCategories = await GetCustomCategories();

    setCategories([...categories, ...customCategories]);
    setIsLoading(false);
  };

  useEffect(() => {
    loadValues();
  }, []);

  const loadValues = () => {
    getAccounts();
    getCategories();
    get();
  };

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
      <div className="w-full flex justify-center p-10 rounded-md">
        <h1 className="text-3xl font-bold leading-7 text-gray-900">Budget</h1>
      </div>

      <div className="collapse collapse-arrow bg-accent">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Add Budget Source
        </div>
        <div className="collapse-content">
          <form ref={formRef} action={create}>
            <div className="flex space-x-5">
              <div className="flex gap-5">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Account</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    name="account"
                  >
                    {accounts.map((account: any) => (
                      <option key={account.id} value={account.id}>
                        {account.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Budget Source</span>
                  </div>
                  <select
                    className="select select-bordered w-full max-w-xs"
                    name="source"
                  >
                    {categories.map((category: any) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Description</span>
                  </div>
                  <input
                    type="text"
                    name="description"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Amount</span>
                  </div>
                  <input
                    type="number"
                    name="amount"
                    defaultValue="0.00"
                    step="0.01"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Date</span>
                  </div>
                  <input
                    type="date"
                    name="date"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
              </div>

              <div className="flex flex-col justify-end">
                <button type="submit" className="btn btn-primary mt-5">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="flex justify-start">
        {accounts.map((account: any, index: number) => (
          <label className="form-control w-full max-w-xs" key={index}>
            <div className="label">
              <span className="label-text">{account.name} Current Balance</span>
            </div>
            <input
              type="text"
              name="name"
              className="input input-bordered w-1/2 max-w-xs"
              value={`R ${
                account.type === "Credit" && account.balance > 0.0
                  ? "-"
                  : account.type === "Debit" && account.balance < 0.0
                  ? "-"
                  : ""
              }${account.balance}`}
              disabled
            />
          </label>
        ))}
        <label className="form-control w-full max-w-xs">
          <div className="label">
            <span className="label-text">Available Balance</span>
          </div>
          <input
            type="text"
            name="name"
            className="input input-bordered w-1/2 max-w-xs"
            value={`R ${netWorth}`}
            disabled
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Account</th>
              <th>Budget Source</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {budget.map((source: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {
                    accounts.find(
                      (account: any) => account.id === source.accountid
                    ).name
                  }
                </td>
                <td>{source.incomesource}</td>
                <td>
                  {(source.date as Date).toLocaleString("en-ZA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    // hour: "2-digit",
                    // minute: "2-digit",
                    // second: "2-digit",
                    // hour12: false, // Set to true for 12-hour format
                  })}
                </td>
                <td>{source.description}</td>
                <td>{source.amount}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDelete(source)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Account</th>
              <th>Budget Source</th>
              <th>Date</th>
              <th>Description</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      {isDeleting && (
        <>
          <Toast toastType="warning" toastMessage="Deleting Income Source." />
        </>
      )}
    </>
  );
}
