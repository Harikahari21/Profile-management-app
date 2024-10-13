import { ProfileForm } from "@/components";
import { getProfile } from "@/components/api";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const ProfileDetails = () => {
  const [profile, setProfile] = useState<any>(null); // State to hold profile data
  const [error, setError] = useState<string | null>(null); // State to handle errors
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editProfile, setEditProfile] = useState<any>(null); // State to hold the profile data for editing

  // Fetch the profile details on component mount
  useEffect(() => {
    try {
      const profileData = getProfile(); // Fetch profile from localStorage
      setProfile(profileData); // Set profile data in state
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message); // Handle error if profile is not found or there is another issue
      } else {
        setError("An unknown error occurred while fetching the profile.");
      }
    }
  }, []);

  const handleEdit = () => {
    setEditProfile(profile); // Pre-fill the form with existing profile data
    setIsModalOpen(true); // Open the edit modal
  };

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
    });

    if (result.isConfirmed) {
      localStorage.removeItem("profile");
      await Swal.fire("Deleted!", "Your profile has been deleted.", "success");

      // Go back to the previous page
      window.history.back(); // This will also take the user back
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>; // Display error message if any
  }
  return (
    <section>
      <section className="flex flex-col gap-6">
        <nav className={`mx-2 md:mx-4 lg:mx-5 2xl:mx-6 top-0 sticky `}>
          <section className="bg-white rounded-md py-2 md:py-0 md:h-16  shadow-[0_0.125rem_0.25rem_rgba(165,163,174,0.3)] mt-3">
            <div className="w-full justify-between main-container flex items-center h-full">
              <p className="text-2xl font-semibold italic">Welcome !</p>
              <h2 className="text-lg font-medium">
                {" "}
                {profile?.firstName && profile?.lastName
                  ? `${profile.firstName} ${profile.lastName}`
                  : "Name"}
              </h2>
            </div>
          </section>
        </nav>
        <div className="main-container">
          <h2 className="font-semibold text-3xl flex justify-center">
            Your Profile Details
          </h2>
        </div>
        <div className="main-container w-1/2">
          <div className="bg-primary/5 rounded-xl shadow-lg px-4 py-6">
            <div className="flex justify-end gap-4 items-center">
              <BiEdit
                className="text-2xl text-secondary cursor-pointer"
                onClick={handleEdit}
              />
              <MdDelete
                className="text-2xl text-youtube cursor-pointer"
                onClick={handleDelete}
              />
            </div>
            <div className="flex flex-col gap-6 justify-center items-center">
              <img src="/user.jpg" alt="" className="h-60 w-fit" />
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 items-center">
                  <p className="font-semibold">Name: </p>
                  <p className="border p-2 w-full rounded-md">
                    {profile?.firstName && profile?.lastName
                      ? `${profile.firstName} ${profile.lastName}`
                      : "N/A"}
                  </p>
                </div>
                <div className="flex gap-4  items-center">
                  <p className="font-semibold">Email:</p>
                  <p className="border p-2 w-full rounded-md">
                    {profile?.email || "N/A"}
                  </p>
                </div>
                <div className="flex gap-4 items-center">
                  <p className="font-semibold">Age:</p>
                  <p className="border p-2 w-full rounded-md">
                    {profile?.age || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 ">
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-semibold">Edit Profile</h3>
              <div></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileDetails;
