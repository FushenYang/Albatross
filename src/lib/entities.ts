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
