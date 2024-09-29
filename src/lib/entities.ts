export interface Inspection {
    id: number;
    Category: string;
    UnitName: string;
    ItemName: string;
    Location: string;
    At: Date;  // At as a Date object
    Description: string;
    Remarks: string;
    IsArchived: boolean;  // Modified to boolean
}
export interface Unit {
    id: number;
    UnitCode: string;
    FullUnitName: string;
    ShortUnitName: string;
    Category: string;
    Location: string;
    Telephone: string;
    ContactPerson: string;
    Remarks: string;
}

export interface UnitAlias {
    id: number;
    UnitCode: string;
    AliasName: string;
}

export interface Member {
    id: number;
    Name: string;
    StaffID: string;
    JoinAt: number;
    BirthDay: string;
    Gender: string;
    IDCard: string;
    Education: string;
    Party: string;
    Phone: string;
    Job: string;
    Grade: string;
    UnitCode: string;
    UnitName: string;
    Title: string;
    ResidencyAddress: string;
    PoliceStation: string;
    Notes: string;
  }