import Database from "tauri-plugin-sql-api";
import { Inspection, Unit, UnitAlias } from "./entities";
import { Member } from "./entities";


// Initialize the database connection and get Db
const getDatabase = async (): Promise<Database> => {
  return await Database.load("sqlite:Albatross.db");
};

// Fetch the count of inspections from the database
export const getInspectionsCount = async (): Promise<number> => {
  const db = await getDatabase();
  const res: { count: number }[] = await db.select(
    "SELECT count(*) as count FROM inspections"
  );
  return res[0].count;
};

// Fetch all inspections from the database
export const getAllInspections = async (): Promise<Inspection[]> => {
  const db = await getDatabase();
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

export const insertInspection = async (inspection: Partial<Inspection>): Promise<void> => {
  const db = await getDatabase();
  await db.execute(
    "INSERT INTO inspections (Category, UnitName, ItemName, Location, At, Description, Remarks, IsArchived) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      inspection.Category,
      inspection.UnitName,
      inspection.ItemName,
      inspection.Location,
      Math.floor(inspection.At!.getTime() / 1000), // Convert Date to Unix timestamp in seconds
      inspection.Description,
      inspection.Remarks,
      inspection.IsArchived ? 1 : 0,
    ]
  );
};

// Fetch all units from the database
export const getAllUnits = async (): Promise<Unit[]> => {
  const db = await getDatabase();
  const res: any[] = await db.select("SELECT * FROM Units");

  const units: Unit[] = res.map((row) => ({
    id: row.id,
    UnitCode: row.UnitCode,
    FullUnitName: row.FullUnitName,
    ShortUnitName: row.ShortUnitName,
    Category: row.Category,
    Location: row.Location,
    Telephone: row.Telephone,
    ContactPerson: row.ContactPerson,
    Remarks: row.Remarks,
  }));

  return units;
};

// Fetch all unit aliases from the database
export const getAllUnitAliases = async (): Promise<UnitAlias[]> => {
  const db = await getDatabase();
  const res: any[] = await db.select("SELECT * FROM UnitAliases");

  const unitAliases: UnitAlias[] = res.map((row) => ({
    id: row.id,
    UnitCode: row.UnitCode,
    AliasName: row.AliasName,
  }));

  return unitAliases;
};

// Delete an inspection from the database
export const deleteInspection = async (id: number): Promise<void> => {
  const db = await getDatabase();
  await db.execute("DELETE FROM inspections WHERE id = ?", [id]);
};


export async function getAllMembers(): Promise<Member[]> {
  const db = await getDatabase();
  const members = await db.select<Member[]>(`SELECT Name, StaffID, JoinAt, BirthDay,
    Gender, IDCard, Education, Party, Phone, Job, Grade, UnitCode,
    UnitName, Title, ResidencyAddress, PoliceStation, Notes FROM Members`);
  return members;
}

export async function deleteMembers() {
  const db = await getDatabase();
  await db.execute("DELETE FROM Members");
}

export async function getMembersCount() {
  const db = await getDatabase();
  const result = await db.select<{ count: number }[]>("SELECT COUNT(*) as count FROM Members");
  return result[0].count;

}