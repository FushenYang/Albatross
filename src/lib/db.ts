import Database from "tauri-plugin-sql-api";
import { Inspection } from "./entities";


// Initialize the database connection and get Db
const getDb = async (): Promise<Database> => {
  return await Database.load("sqlite:Albatross.db");
};

// Fetch the count of inspections from the database
export const getInspectionsCount = async (): Promise<number> => {
  const db = await getDb();
  const res: { count: number }[] = await db.select(
    "SELECT count(*) as count FROM inspections"
  );
  return res[0].count;
};

// Fetch all inspections from the database
export const getAllInspections = async (): Promise<Inspection[]> => {
  const db = await getDb();
  const res: any[] = await db.select("SELECT * FROM inspections");

  //console.log(res)
  // Convert the 'At' field from integer to Date object
  const inspections: Inspection[] = res.map((row) => ({
    id: row.id,
    Category: row.Category,
    UnitName: row.UnitName,
    ItemName: row.ItemName,
    Location: row.Location,
    At: new Date(parseInt(row.At.toString(), 10) * 1000), // Assuming 'At' is a Unix timestamp in seconds
    Description: row.Description,
    Remarks: row.Remarks,
    IsArchived: row.IsArchived === 1,
  }));

  return inspections;
};