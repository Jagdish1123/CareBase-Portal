import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import SidebarAlt from "./components/SiderbarD";
import { Home, Profile, Onboarding } from "./pages";
import MedicalRecords from "./pages/records";
import SingleRecordDetails from "./pages/records/single-record-details";
import ScreeningSchedule from "./pages/ScreeningSchedule";
import { useStateContext } from "./context";
// import DoctorLogin from "./pages/OnboardingD";
// import DoctorProfile from "./pages/ProfileD";
// import DoctorDashboard from "./pages/HomeD";
import UserInfo from "./pages/UserInfo";
import HealthJournal from "./pages/HealthJournal";
import ShareRecords from "./pages/ShareRecords";
import Chatbot from "./pages/Chatbot";
import Chats_app from "./pages/Chats_app";
import Dashboard from "./components/Dashboard";

const App = () => {
  const { user, authenticated, ready, login, currentUser } = useStateContext();
  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation();

=======
  const location=useLocation();
  const isDoctor=location.pathname.startsWith('/doctor')
>>>>>>> 984518adadbd368be9f5a832d6b4471c35747f67
  useEffect(() => {
    if (ready && !authenticated) {
      login();
    } else if (user && !currentUser) {
      navigate("/onboarding");
    }
  }, [user, authenticated, ready, login, currentUser, navigate]);

  const isDoctorRoute = location.pathname.startsWith("/doctor");

  return (
    <div className="sm:-8 relative flex min-h-screen flex-row bg-[#13131a] p-4">
      <div className="relative mr-10 hidden sm:flex">
<<<<<<< HEAD
        {isDoctorRoute ? <SidebarAlt /> : <Sidebar />}
=======
        {/* <Sidebar/> */}
        {isDoctor?<SidebarAlt />:<Sidebar/> }

>>>>>>> 984518adadbd368be9f5a832d6b4471c35747f67
      </div>

      <div className="mx-auto max-w-[1280px] flex-1 max-sm:w-full sm:pr-5">
        <Navbar />

        <Routes>
          {/* User Routes */}

          <Route path="/" element={
            <>
              <Home />
              <Dashboard />
            </>
          } />

          <Route path="/profile" element={<Profile />} />
          <Route path="/user-info" element={<UserInfo />} />
          <Route path="/login" element={<Onboarding />} />
          <Route path="/medical-records" element={<MedicalRecords />} />
          <Route path="/medical-records/:id" element={<SingleRecordDetails />} />
          <Route path="/screening-schedules" element={<ScreeningSchedule />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/chat" element={<Chats_app />} />
<<<<<<< HEAD
          <Route path="/health-journal" element={<HealthJournal />} />
          <Route path="/share-records" element={<ShareRecords />} />
=======
>>>>>>> 984518adadbd368be9f5a832d6b4471c35747f67


          {/* Doctor Routes
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
<<<<<<< HEAD
          <Route path="/doctor-login" element={<DoctorLogin />} /> */}

=======
          <Route path="/doctor-login" element={<DoctorLogin />} />
          <Route path="/doctor-chat" element={<Chats_app />} />
>>>>>>> 984518adadbd368be9f5a832d6b4471c35747f67
        </Routes>

      </div>
    </div>
    
  );
};

export default App;