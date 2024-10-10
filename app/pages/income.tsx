"use client";

import { useState, useEffect, useRef } from "react";
import {
  CreateIncomeSource,
  DeleteIncomeSource,
  GetAccounts,
  GetIncomeSources,
} from "../serverCRUDActions";
import Loader from "../components/loader";
import Toast from "../components/toast";

export default function Income() {
  const [accounts, setAccounts] = useState([] as any);
  const [income, setIncome] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  let debounceTimeout: NodeJS.Timeout | null = null;

  const formRef = useRef<HTMLFormElement>(null);

  const create = async (formData: FormData) => {
    await CreateIncomeSource(
      formData.get("account") as unknown as number,
      formData.get("source") as string,
      formData.get("description") as string,
      formData.get("amount") as unknown as number
    );
    get();

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleDelete = async (id: number) => {
    setIsDeleting(true);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    await DeleteIncomeSource(id);

    debounceTimeout = setTimeout(async () => {
      get();
      setIsDeleting(false);
    }, 2000);
  };

  const get = async () => {
    setIsLoading(true);
    const income = await GetIncomeSources();

    setIncome(income);
    setIsLoading(false);
  };

  const getAccounts = async () => {
    setIsLoading(true);
    const accounts = await GetAccounts();

    setAccounts(accounts);
    setIsLoading(false);
  };

  useEffect(() => {
    getAccounts();
    get();
  }, []);

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
      <h1 className="text-3xl font-bold leading-7 text-gray-900">Income</h1>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">
          Add Income Source
        </div>
        <div className="collapse-content">
          <form ref={formRef} action={create}>
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
                  <span className="label-text">Income Source</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="source"
                >
                  <option>Salary</option>
                  <option>Rental Income</option>
                  <option>Other</option>
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
            </div>

            <button type="submit" className="btn btn-primary mt-5">
              Submit
            </button>
          </form>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Account</th>
              <th>Income Source</th>
              <th>Description</th>
              <th>Amount</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {income.map((source: any, index: number) => (
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
                <td>{source.description}</td>
                <td>{source.amount}</td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => handleDelete(source.id)}
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
              <th>Income Source</th>
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
