"use client";

import Loader from "@/app/components/loader";
import { CreateSetting, GetSettings } from "@/app/serverCRUDActions";
import { useEffect, useRef, useState } from "react";

export default function Settings() {
  const [settings, setSettings] = useState([] as any);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  const create = async (formData: FormData) => {
    await CreateSetting(formData.get("currency") as string);
    get();

    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const get = async () => {
    setIsLoading(true);
    const settings = await GetSettings();

    setSettings(settings);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold leading-7 text-gray-900">Settings</h1>

      <form ref={formRef} action={create} className="pt-10">
        <div className="flex gap-5">
          <label className="input input-bordered flex items-center gap-2">
            Currency
            <input type="text" name="currency" className="grow" />
          </label>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {isLoading && <Loader />}

      {settings.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>Currency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{settings[0].currency}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
