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