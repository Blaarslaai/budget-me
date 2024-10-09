"use client";

import { Subscription, User } from "@reflowhq/auth-next/types";
import { refreshUserCookie } from "@/app/serverFunction";
import { useRef, useState } from "react";
import Loader from "@/app/components/loader";
import { SendEmail } from "../serverCRUDActions";
import UnsubscribeButton from "../components/unsubscribeButton";

type Props = {
  user: User | null;
  subscription: Subscription | null;
};

export default function Profile({ user, subscription }: Props) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);

    if (photo) {
      formData.set("photo", photo);
    }

    const response = await fetch("/api", {
      method: "POST",
      body: formData,
    });

    await refreshUserCookie();

    setIsLoading(false);

    console.log(response);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setPhoto(files[0]); // Store the selected file
    }
  };

  const handleInvite = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = await SendEmail(formData.get("email") as string);

    console.log(data);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <h1 className="text-3xl font-bold leading-7 text-gray-900">Profile</h1>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Edit Details</div>
        <div className="collapse-content">
          <form onSubmit={handleSubmit}>
            <div className="w-52 rounded-full mb-5">
              <img alt="Avatar" src={user?.photo} />
            </div>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Profile Photo</span>
              </div>
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Name</span>
              </div>
              <input
                type="text"
                name="name"
                className="input input-bordered w-full max-w-xs"
                defaultValue={user?.name}
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                name="email"
                className="input input-bordered w-full max-w-xs"
                defaultValue={user?.email}
                readOnly
              />
            </label>
            <button className="btn btn-primary mt-5" type="submit">
              Update User
            </button>
          </form>
        </div>
      </div>

      {subscription && (
        <div className="flex w-1/2 items-center">
          <UnsubscribeButton />
          <span className="px-1">from</span>
          <span>{subscription?.plan.name}</span>
        </div>
      )}

      <br />
      <br />

      {subscription?.plan.parameters.access_level == "family" && (
        <div className="w-1/2">
          <div className="pr-1">
            You're on the Family package. Invite a second user below.
          </div>

          <form onSubmit={handleInvite}>
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              name="email"
              className="input input-bordered w-full max-w-xs mr-5"
            />
            <button className="btn btn-primary" type="submit">
              Invite User
            </button>
          </form>
        </div>
      )}
    </>
  );
}
