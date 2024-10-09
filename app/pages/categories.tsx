"use client";

import Loader from "@/app/components/loader";
import {
  CreateCustomCategory,
  DeleteCustomCategory,
  GetCategories,
  GetCustomCategories,
} from "@/app/serverCRUDActions";
import { useEffect, useRef, useState } from "react";

export default function Categories() {
  const [categories, setCategories] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const create = async (formData: FormData) => {
    await CreateCustomCategory(formData.get("name") as string);
    get();

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const handleDelete = async (id: number) => {
    await DeleteCustomCategory(id);
    get();

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const get = async () => {
    setIsLoading(true);
    const customCategories = await GetCustomCategories();
    const categories = await GetCategories();

    const combinedCategories = [...customCategories, ...categories];
    const sortedCategories = [...combinedCategories].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    setCategories(sortedCategories);
    console.log(sortedCategories);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold leading-7 text-gray-900">
        Budgeting Categories
      </h1>

      <h2 className="text-xl font-bold leading-7 text-gray-900">
        Create Custom Categories
      </h2>
      <form ref={formRef} action={create} className="pt-10">
        <div className="flex">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Category Name</span>
            </div>
            <input
              type="text"
              name="name"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>

        <button type="submit" className="btn btn-primary btn-sm mt-5">
          Submit
        </button>
      </form>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto w-1/4">
          <table className="table table-xs">
            <thead>
              <tr>
                <th></th>
                <th>Category Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category: any, index: number) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>
                    {category.email && (
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDelete(category.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th></th>
                <th>Category Name</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </>
  );
}
