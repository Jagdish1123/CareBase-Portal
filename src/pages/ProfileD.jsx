import { useEffect } from "react";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";
import img from "../assets/profile.png";

const DoctorProfile = () => {
  const { currentDoctor, fetchDoctorByEmail } = useStateContext();
  // console.log(currentDoctor)
  const { user } = usePrivy();

  useEffect(() => {
    if (!currentDoctor) {
      fetchDoctorByEmail(user?.email?.address);
    }
  }, [currentDoctor, fetchDoctorByEmail]);

  if (!currentDoctor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-lg text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 max-w-lg rounded-lg bg-[#1c1c24] p-6 shadow-lg">
      <div className="flex flex-col items-center">
        <div className="mb-4 h-24 w-24 rounded-full bg-[#0092F3] shadow-lg">
          <img src={img} alt="Doctor Profile" className="h-full w-full rounded-full" />
        </div>
        <h1 className="mb-2 text-3xl font-semibold text-white">Doctor Profile</h1>
        <div className="mt-4 w-full">
          <p className="mb-1 text-sm text-gray-400">Name:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentDoctor.name || "N/A"}</p>

          <p className="mb-1 text-sm text-gray-400">Email:</p>
          <p className="mb-4 text-lg font-semibold text-white">   {currentDoctor.createdBy}</p>

          <p className="mb-1 text-sm text-gray-400">Specialization:</p>
          <p className="mb-4 text-lg font-semibold text-white">{currentDoctor.specialization || "N/A"}</p>

          <p className="mb-1 text-sm text-gray-400">Experience:</p>
          <p className="mb-4 text-lg font-semibold text-white">
            {currentDoctor.experience !== undefined ? `${currentDoctor.experience} years` : "N/A"}
          </p>

          <p className="mb-1 text-sm text-gray-400">Location:</p>
          <p className="text-lg font-semibold text-white">{currentDoctor.location || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;

