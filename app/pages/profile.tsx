"use client";

import { Subscription, User } from "@reflowhq/auth-next/types";
import { refreshUserCookie } from "@/app/serverFunction";
import { useEffect, useState } from "react";
import Loader from "@/app/components/loader";
import {
  CreateFamilyUser,
  DeactivateFamilyUser,
  GetFamilyUsers,
  SendEmail,
} from "../serverCRUDActions";
import UnsubscribeButton from "../components/unsubscribeButton";
import Image from "next/image";
import { debounce } from "chart.js/helpers";
import Toast from "../components/toast";
import avatar from "../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

type Props = {
  user: User | null;
  subscription: Subscription | null;
};

export default function Profile({ user, subscription }: Props) {
  const [photo, setPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isRevoking, setIsRevoking] = useState(false);

  const [familyMembers, setFamilyMembers] = useState([] as any[]);

  const get = async () => {
    setIsLoading(true);
    const familyMembers = await GetFamilyUsers();
    setFamilyMembers(familyMembers);
    setIsLoading(false);
  };

  useEffect(() => {
    get();
  }, []);

  const handleRevoke = async (id: number) => {
    const debouncedSetShowRevoke = debounce(() => setIsRevoking(false), 2500);
    await DeactivateFamilyUser(id);

    const handleRevoke = () => {
      setIsRevoking(true);

      debouncedSetShowRevoke();
    };

    get();
    handleRevoke();
  };

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

    const familyMember = familyMembers.find(
      (member) => !member.active && member.pending
    );

    console.log(familyMember);

    if (!familyMember) {
      const data = await SendEmail(formData.get("email") as string);

      if (data) {
        await CreateFamilyUser(formData.get("email") as string);
      } else {
        const debouncedSetShowError = debounce(() => setShowError(false), 2500);

        const handleError = () => {
          setShowError(true);

          debouncedSetShowError();
        };

        handleError();
      }

      const debouncedSetShowSuccess = debounce(
        () => setShowSuccess(false),
        2500
      );

      const handleSuccess = () => {
        setShowSuccess(true);

        debouncedSetShowSuccess();
      };

      handleSuccess();
    } else {
      const debouncedSetShowInfo = debounce(() => setShowInfo(false), 2500);

      const handleInfo = () => {
        setShowInfo(true);

        debouncedSetShowInfo();
      };

      handleInfo();
    }

    get();
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
      <div className="w-full flex justify-center bg-gray-100 p-10 rounded-md">
        <h1 className="text-3xl font-bold leading-7 text-gray-900">Profile</h1>
      </div>

      <div className="collapse collapse-arrow bg-accent">
        <input type="checkbox" />
        <div className="collapse-title text-xl font-medium">Edit Details</div>
        <div className="collapse-content">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-row space-x-10">
              <div className="flex-none">
                <div className="w-52 rounded-full mb-5">
                  <Image
                    alt="Avatar"
                    src={user ? user.photo : avatar.src}
                    width="250"
                    height="250"
                  />
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
              </div>
              <div className="flex-auto">
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
                    disabled
                  />
                </label>
              </div>
              <div className="flex flex-col justify-end">
                <button className="btn btn-primary mt-5" type="submit">
                  Update User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {subscription?.plan.parameters.access_level == "family" && (
        <div className="w-1/2">
          <div className="pr-1">
            You&apos;re on the Family package. Invite a second user below.
          </div>

          <form onSubmit={handleInvite}>
            <div className="label">
              <span className="label-text">Email</span>
            </div>
            <input
              type="text"
              name="email"
              className="input input-bordered w-full max-w-xs mr-5"
              required
            />
            <button className="btn btn-primary" type="submit">
              Invite User
            </button>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Invited User</th>
              <th>Date Invited</th>
              <th>Profile Active</th>
              <th>Invite Pending</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {familyMembers.map((source: any, index: number) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{source.invitedemail}</td>
                <td>
                  {(source.created_at as Date).toLocaleString("en-ZA", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    // hour: "2-digit",
                    // minute: "2-digit",
                    // second: "2-digit",
                    // hour12: false, // Set to true for 12-hour format
                  })}
                </td>
                <td className="pl-5">
                  {source.active ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faX} />
                  )}
                </td>
                <td className="pl-5">
                  {source.pending ? (
                    <FontAwesomeIcon icon={faCheck} />
                  ) : (
                    <FontAwesomeIcon icon={faX} />
                  )}
                </td>
                <td>
                  <button
                    className={`btn btn-xs ${
                      source.pending || source.active ? null : "btn-disabled"
                    }`}
                    onClick={() => handleRevoke(source.id)}
                  >
                    Revoke Invitation
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Invited User</th>
              <th>Date</th>
              <th>Profile Active</th>
              <th>Invite Pending</th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="flex justify-center items-center mt-10">
        {subscription && (
          <>
            <UnsubscribeButton />
            <span className="px-1">from your plan: </span>
            <strong>{subscription?.plan.name}</strong>
          </>
        )}
      </div>

      {showError && (
        <Toast
          toastMessage="Error Inviting Family Member. Please Contact Support."
          toastType="error"
        />
      )}

      {showInfo && (
        <Toast
          toastMessage="Family Member Invitation Outstanding."
          toastType="info"
        />
      )}

      {showSuccess && (
        <Toast
          toastMessage="Family Member Invited Successfully."
          toastType="success"
        />
      )}

      {isRevoking && (
        <>
          <Toast
            toastType="warning"
            toastMessage="Revoking Account Invitation."
          />
        </>
      )}
    </>
  );
}
