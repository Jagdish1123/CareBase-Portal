import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { usePrivy } from "@privy-io/react-auth";

const DoctorLogin = () => {
  const { createDoctor } = useStateContext(); // ✅ Use createDoctor, not createUser
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();
  const { user } = usePrivy();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!user || !user.email) {
      console.error("User or user.email is not defined");
      return;
    }

    const doctorData = {
      name,
      specialization,
      experience: parseInt(experience, 10),
      location,
      createdBy: user.email.address,
    };

    console.log(doctorData);
    const newDoctor = await createDoctor(doctorData); // ✅ Correct function call
    if (newDoctor) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#13131a]">
      <div className="w-full max-w-md rounded-xl bg-[#1c1c24] p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-white">Doctor Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="name" className="mb-2 block text-sm text-gray-300">Name</label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="specialization" className="mb-2 block text-sm text-gray-300">Specialization</label>
            <input id="specialization" type="text" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="experience" className="mb-2 block text-sm text-gray-300">Experience (Years)</label>
            <input id="experience" type="number" value={experience} onChange={(e) => setExperience(e.target.value)} required className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none" />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 block text-sm text-gray-300">Location</label>
            <input id="location" type="text" value={location} onChange={(e) => setLocation(e.target.value)} required className="w-full rounded-lg bg-neutral-900 px-4 py-3 text-neutral-400 focus:border-blue-600 focus:outline-none" />
          </div>
          <button type="submit" className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-600">Login</button>
        </form>
      </div>
    </div>
  );
};

export default DoctorLogin;
