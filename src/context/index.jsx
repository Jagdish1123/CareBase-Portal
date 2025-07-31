import { createContext, useContext, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { eq } from "drizzle-orm";
// Adjust the paths to your Drizzle ORM configuration and schema files
import { db } from "../utils/dbConfig";
import { Users, Records, Doctors } from "../utils/schema";

// Create a context
const StateContext = createContext();

// Provider component
export const StateContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [allUserRecords, setAllUserRecords] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState(null);

  // --- User-related Functions ---
  const fetchUsers = useCallback(async () => {
    try {
      const result = await db.select().from(Users).execute();
      setUsers(result);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  }, []);

  const fetchUserByEmail = useCallback(async (email) => {
    if (!email) return;
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

  // --- Doctor-related Functions ---
  const fetchDoctors = useCallback(async () => {
    try {
      const result = await db.select().from(Doctors).execute();
      setDoctors(result);
    } catch (error) {
      console.error("Error fetching all doctors:", error);
    }
  }, []);

  const fetchDoctorByEmail = useCallback(async (email) => {
    if (!email) return;
    try {
      const result = await db
        .select()
        .from(Doctors)
        .where(eq(Doctors.createdBy, email))
        .execute();
      if (result.length > 0) {
        setCurrentDoctor(result[0]);
      }
    } catch (error) {
      console.error("Error fetching doctor by email:", error);
    }
  }, []);

  const createDoctor = useCallback(async (doctorData) => {
    try {
      const newDoctor = await db
        .insert(Doctors)
        .values(doctorData)
        .returning({ id: Doctors.id, createdBy: Doctors.createdBy })
        .execute();
      setDoctors((prevDoctors) => [...prevDoctors, newDoctor[0]]);
      return newDoctor[0];
    } catch (error) {
      console.error("Error creating doctor:", error);
      return null;
    }
  }, []);

  // --- Record-related Functions ---
  const fetchAllUserRecords = useCallback(async () => {
    try {
      const result = await db.select().from(Records).execute();
      setAllUserRecords(result);
    } catch (error) {
      console.error("Error fetching all user records:", error);
    }
  }, []);

  const fetchUserRecords = useCallback(async (userEmail) => {
    if (!userEmail) return;
    try {
      const result = await db
        .select()
        .from(Records)
        .where(eq(Records.createdBy, userEmail))
        .execute();
      setRecords(result);
    } catch (error) {
      console.error("Error fetching records for user:", error);
    }
  }, []);

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

  const updateRecord = useCallback(async (recordData) => {
    try {
      const { documentID, ...dataToUpdate } = recordData;
      const updatedRecords = await db
        .update(Records)
        .set(dataToUpdate)
        .where(eq(Records.id, documentID))
        .returning();
      return updatedRecords[0];
    } catch (error) {
      console.error("Error updating record:", error);
      return null;
    }
  }, []);

  const value = {
    users,
    records,
    allUserRecords,
    currentUser,
    doctors,
    currentDoctor,
    fetchUsers,
    fetchUserByEmail,
    createUser,
    fetchAllUserRecords,
    fetchUserRecords,
    createRecord,
    updateRecord,
    createDoctor,
    fetchDoctors,
    fetchDoctorByEmail,
    // Note: fetchDoctorsByUser and fetchUsersByDoctor were removed as they
    // depend on a join table (DoctorUsers) which was not defined in the schema.
  };

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};

StateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the context
export const useStateContext = () => useContext(StateContext);
