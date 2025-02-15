// import { createContext, useContext, useState, useCallback } from "react";
// import { db } from "../utils/dbConfig"; // Adjust the path to your dbConfig
// import { Users, Records, DoctorUsers, Doctors } from "../utils/schema"; 
// import { eq } from "drizzle-orm";
// import PropTypes from "prop-types";

// // Create a context
// const StateContext = createContext();

// // Provider component
// export const StateContextProvider = ({ children }) => {
//   const [users, setUsers] = useState([]);
//   const [records, setRecords] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [currentDoctor, setCurrentDoctor] = useState(null);
//   const [doctors, setDoctors] = useState([]);

//   // Function to fetch all users
//   const fetchUsers = useCallback(async () => {
//     try {
//       const result = await db.select().from(Users).execute();
//       setUsers(result);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   }, []);

//   // Function to fetch user details by email
//   const fetchUserByEmail = useCallback(async (email) => {
//     if (!email) return; // Add a check for undefined or null email
//     try {
//       const result = await db
//         .select()
//         .from(Users)
//         .where(eq(Users.createdBy, email))
//         .execute();
//       if (result.length > 0) {
//         setCurrentUser(result[0]);
//       }
//     } catch (error) {
//       console.error("Error fetching user by email:", error);
//     }
//   }, []);

//   // Function to create a new user
//   const createUser = useCallback(async (userData) => {
//     try {
//       const newUser = await db
//         .insert(Users)
//         .values(userData)
//         .returning({ id: Users.id, createdBy: Users.createdBy })
//         .execute();
//       setUsers((prevUsers) => [...prevUsers, newUser[0]]);
//       return newUser[0];
//     } catch (error) {
//       console.error("Error creating user:", error);
//       return null;
//     }
//   }, []);

//   // Function to fetch all records for a specific user
//   const fetchUserRecords = useCallback(async (userEmail) => {
//     try {
//       const result = await db
//         .select()
//         .from(Records)
//         .where(eq(Records.createdBy, userEmail))
//         .execute();
//       setRecords(result);
//     } catch (error) {
//       console.error("Error fetching user records:", error);
//     }
//   }, []);


//   //doctor
//   const fetchDoctorByEmail = useCallback(async (email) => {
//     if (!email) return; // Ensure email is provided

//     try {
//       const result = await db
//         .select()
//         .from(Doctors)
//         .where(eq(Doctors.createdBy, email))
//         .execute();

//       if (result.length > 0) {
//         console.log(currentDoctor);
//         setCurrentDoctor(result[0]); // ✅ Corrected setter
//       }
//     } catch (error) {
//       console.error("Error fetching doctor by email:", error);
//     }
//   }, []);

//   // Function to create a new record
//   const createRecord = useCallback(async (recordData) => {
//     try {
//       const newRecord = await db
//         .insert(Records)
//         .values(recordData)
//         .returning({ id: Records.id })
//         .execute();
//       setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
//       return newRecord[0];
//     } catch (error) {
//       console.error("Error creating record:", error);
//       return null;
//     }
//   }, []);

//   const updateRecord = useCallback(async (recordData) => {
//     try {
//       const { documentID, ...dataToUpdate } = recordData;
//       const updatedRecords = await db
//         .update(Records)
//         .set(dataToUpdate)
//         .where(eq(Records.id, documentID))
//         .returning();
//       return updatedRecords[0]; // Return the updated record
//     } catch (error) {
//       console.error("Error updating record:", error);
//       return null;
//     }
//   }, []);

//   //new doctor
//   const createDoctor = useCallback(async (doctorData) => {
//     try {
//       const newDoctor = await db
//         .insert(Doctors)
//         .values(doctorData)
//         .returning([Doctors.id, Doctors.createdBy]) // ✅ Correct way
//         .execute();
//       setDoctors((prevDoctors) => [...prevDoctors, newDoctor[0]]);
//       return newDoctor[0];
//     } catch (error) {
//       console.error("Error creating doctor:", error);
//       return null;
//     }
//   }, []);


//   // Function to fetch all doctors
//   const fetchDoctors = useCallback(async () => {
//     try {
//       const result = await db.select().from(Doctors).execute();
//       setDoctors(result);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   }, []);

//   // Function to fetch doctors associated with a user
//   const fetchDoctorsByUser = useCallback(async (userId) => {
//     try {
//       const result = await db
//         .select()
//         .from(Doctors)
//         .innerJoin(DoctorUsers, eq(DoctorUsers.doctorId, Doctors.id))
//         .where(eq(DoctorUsers.userId, userId))
//         .execute();
//       return result;
//     } catch (error) {
//       console.error("Error fetching doctors by user:", error);
//     }
//   }, []);

//   // Function to fetch users associated with a doctor
//   const fetchUsersByDoctor = useCallback(async (doctorId) => {
//     try {
//       const result = await db
//         .select()
//         .from(Users)
//         .innerJoin(DoctorUsers, eq(DoctorUsers.userId, Users.id))
//         .where(eq(DoctorUsers.doctorId, doctorId))
//         .execute();
//       return result;
//     } catch (error) {
//       console.error("Error fetching users by doctor:", error);
//     }
//   }, []);

//   return (
//     <StateContext.Provider
//       value={{
//         users,
//         doctors,
//         records,
//         fetchUsers,
//         fetchUserByEmail,
//         createUser,
//         fetchUserRecords,
//         createRecord,
//         currentUser,
//         currentDoctor,
//         updateRecord,
//         // ---------
//         createDoctor,
//         fetchDoctors,
//         fetchDoctorsByUser,
//         fetchUsersByDoctor,
//         fetchDoctorByEmail,

//       }}
//     >
//       {children}
//     </StateContext.Provider>
//   );
// };

// StateContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };

// // Custom hook to use the context
// export const useStateContext = () => useContext(StateContext);


import { createContext, useContext, useState, useCallback } from "react";
import { db } from "../utils/dbConfig"; // Adjust the path to your dbConfig
import { Users, Records, DoctorUsers, Doctors } from "../utils/schema"; 
import { eq } from "drizzle-orm";
import PropTypes from "prop-types";

// Create a context
const StateContext = createContext();

// Provider component
export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [currentDoctor, setCurrentDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);

  // Function to fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }, []);

  // Function to fetch user details by email
  const fetchUserByEmail = useCallback(async (email) => {
    if (!email) return; // Add a check for undefined or null email
    try {
      const result = await db
        .select()
        .from(Users)
        .where(eq(Users.createdBy, email))
        .execute();
      if (result.length > 0) {
        setCurrentUser(result[0]);
      }
    } catch (error) {
      console.error("Error fetching user by email:", error);
    }
  }, []);

  // Function to create a new user
  const createUser = useCallback(async (userData) => {
    try {
      const newUser = await db
        .insert(Users)
        .values(userData)
        .returning({ id: Users.id, createdBy: Users.createdBy })
        .execute();
      setUsers((prevUsers) => [...prevUsers, newUser[0]]);
      return newUser[0];
    } catch (error) {
      console.error("Error creating user:", error);
      return null;
    }
  }, []);

  // Function to fetch all records for a specific user
  const fetchUserRecords = useCallback(async () => {
    try {
      const result = await db
        .select()
        .from(Records)
        // .where(eq(Records.createdBy, userEmail))
        .execute();
      setRecords(result);
      // console.log("--------->",result[0])
    } catch (error) {
      console.error("Error fetching user records:", error);
    }
  }, []);

  // Function to fetch doctor details by email
  const fetchDoctorByEmail = useCallback(async (email) => {
    if (!email) return; // Ensure email is provided

    try {
      const result = await db
        .select()
        .from(Doctors)
        .where(eq(Doctors.createdBy, email))
        .execute();

      if (result.length > 0) {
        // console.log(currentDoctor);
        setCurrentDoctor(result[0]); // ✅ Corrected setter
      }
    } catch (error) {
      console.error("Error fetching doctor by email:", error);
    }
  }, []);

  // Function to create a new record
  const createRecord = useCallback(async (recordData) => {
    try {
      const newRecord = await db
        .insert(Records)
        .values(recordData)
        .returning({ id: Records.id })
        .execute();
      setRecords((prevRecords) => [...prevRecords, newRecord[0]]);
      return newRecord[0];
    } catch (error) {
      console.error("Error creating record:", error);
      return null;
    }
  }, []);

  // Function to update a record
  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;
      const updatedRecords = await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
      return updatedRecords[0]; // Return the updated record
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  }, []);

  // Function to create a new doctor
  const createDoctor = useCallback(async (doctorData) => {
    try {
      const newDoctor = await db
        .insert(Doctors)
        .values(doctorData)
        .returning([Doctors.id, Doctors.createdBy]) // ✅ Correct way
        .execute();
      setDoctors((prevDoctors) => [...prevDoctors, newDoctor[0]]);
      return newDoctor[0];
    } catch (error) {
      console.error("Error creating doctor:", error);
      return null;
    }
  }, []);

  // Function to fetch all doctors
  const fetchDoctors = useCallback(async () => {
    try {
      const result = await db.select().from(Doctors).execute();
      setDoctors(result);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  }, []);

  // Function to fetch doctors associated with a user
  const fetchDoctorsByUser = useCallback(async (userId) => {
    try {
      const result = await db
        .select()
        .from(Doctors)
        .innerJoin(DoctorUsers, eq(DoctorUsers.doctorId, Doctors.id))
        .where(eq(DoctorUsers.userId, userId))
        .execute();
      return result;
    } catch (error) {
      console.error("Error fetching doctors by user:", error);
    }
  }, []);

  // Function to fetch users associated with a doctor
  const fetchUsersByDoctor = useCallback(async (doctorId) => {
    try {
      const result = await db
        .select()
        .from(Users)
        .innerJoin(DoctorUsers, eq(DoctorUsers.userId, Users.id))
        .where(eq(DoctorUsers.doctorId, doctorId))
        .execute();
      return result;
    } catch (error) {
      console.error("Error fetching users by doctor:", error);
    }
  }, []);

  // Function to fetch record details with specific fields
  const fetchRecordDetails = useCallback(async (recordEmail) => {
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, recordEmail)) // Fetch based on email (createdBy)
        .execute();
  
      if (result.length > 0) {
        const { analysisResult } = result[0]; // Destructure only analysisResult
        console.log("Analysis Result:", analysisResult);
        return analysisResult; // Return only the analysisResult
      } else {
        console.log("Record not found");
        return null;
      }
    } catch (error) {
      console.error("Error fetching record details:", error);
    }
  }, []);
  

  return (
    <StateContext.Provider
      value={{
        users,
        doctors,
        records,
        fetchUsers,
        fetchUserByEmail,
        createUser,
        fetchUserRecords,
        createRecord,
        currentUser,
        currentDoctor,
        updateRecord,
        // ---------
        createDoctor,
        fetchDoctors,
        fetchDoctorsByUser,
        fetchUsersByDoctor,
        fetchDoctorByEmail,
        fetchRecordDetails, // Added fetchRecordDetails to the context
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);

