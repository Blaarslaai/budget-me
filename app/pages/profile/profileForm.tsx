"use client";

import { User } from "@reflowhq/auth-next/types";
import { refreshUserCookie } from "@/app/serverFunction";
import { useState } from "react";
import Loader from "@/app/components/loader";

type Props = {
  user: User | null;
};

export default function ProfileForm({ user }: Props) {
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

  if (isLoading) return <Loader />;

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <div className="w-52 rounded-full">
          <img alt="Avatar" src={user?.photo} />
        </div>
      </div>
      <input
        type="file"
        name="photo"
        onChange={handleFileChange}
        className="file-input file-input-bordered file-input-sm w-full max-w-xs"
      />
      <label className="input input-bordered flex items-center gap-2">
        Name
        <input
          type="text"
          name="name"
          className="grow"
          defaultValue={user?.name}
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        Email
        <input
          type="text"
          name="email"
          className="grow"
          defaultValue={user?.email}
          readOnly
        />
      </label>
      <button className="btn btn-primary" type="submit">
        Update User
      </button>
    </form>
  );
}
