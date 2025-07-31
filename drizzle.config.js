const casebaseKey = import.meta.env.VITE_CAREBASE_KEY; 


export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url: casebaseKey, 
    connectionString: casebaseKey, 
  },
};
