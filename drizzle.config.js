// const casebaseKey = import.meta.env.VITE_CAREBASE_KEY; 
const casebaseKey="postgresql://Medical_owner:npg_mhwX9PqRzMx6@ep-late-truth-a86p1fy5-pooler.eastus2.azure.neon.tech/CareBase?sslmode=require"


export default {
  dialect: "postgresql",
  schema: "./src/utils/schema.jsx",
  out: "./drizzle",
  dbCredentials: {
    url: casebaseKey, 
    connectionString: casebaseKey, 
  },
};
