"use client";

import Loader from "@/app/components/loader";
import {
  CreateAccount,
  DeleteAccount,
  GetAccounts,
} from "@/app/serverCRUDActions";
import { useEffect, useRef, useState } from "react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState(0);

  const formRef = useRef<HTMLFormElement>(null);

  const create = async (formData: FormData) => {
    await CreateAccount(
      formData.get("name") as string,
      formData.get("type") as string,
      formData.get("balance") as unknown as number
    );
    get();

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleDelete = async (id: number) => {
    await DeleteAccount(id);
    get();

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const get = async () => {
    setIsLoading(true);
    const accounts = await GetAccounts();

    setAccounts(accounts);
    setIsLoading(false);
  };

  useEffect(() => {
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
      <h1 className="text-3xl font-bold leading-7 text-gray-900">Accounts</h1>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Add Account</div>
        <div className="collapse-content">
          <form ref={formRef} action={create}>
            <div className="flex gap-5">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Account Name</span>
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Account Type</span>
                </div>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="type"
                >
                  <option>Credit</option>
                  <option>Debit</option>
                </select>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Starting Balance</span>
                </div>
                <input
                  type="number"
                  name="balance"
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
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account: any, index: number) => (
              <tr key={account.id}>
                <td>{index + 1}</td>
                <td>{account.name}</td>
                <td>{account.type}</td>
                <td
                  className={`${
                    account.type === "Credit" && account.balance > 0.0
                      ? "text-red-500"
                      : "text-green-500"
                  } ${
                    account.type === "Debit" && account.balance < 0.0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {account.type === "Credit" && account.balance > 0.0
                    ? "-"
                    : account.type === "Debit" && account.balance < 0.0
                    ? "-"
                    : null}
                  {account.balance}
                </td>
                <td>
                  <button
                    className="btn btn-xs"
                    onClick={() => {
                      setAccountToDelete(account.id);
                      (
                        document.getElementById("deleteModal") as any
                      ).showModal();
                    }}
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
              <th>Account Name</th>
              <th>Account Type</th>
              <th>Balance</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <dialog id="deleteModal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Warning!</h3>
          <p className="py-4">
            Deleting an <strong>account</strong> will also delete all{" "}
            <strong>income</strong> and <strong>budget</strong> values
            associated with it.
            <br />
            <br />
            Are you sure?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn btn-success btn-xs"
                onClick={() => handleDelete(accountToDelete)}
              >
                Yes
              </button>
              <button className="btn btn-error btn-xs ml-5">No</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
