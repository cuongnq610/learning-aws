export type MartyprsPosition = {
  col: number;
  row: number;
  area: string;
};

export type Martyprs = {
  position: string; // format: "x,y"
  name: string;
  deadDate: string;
  yearOfBirth?: string;
  imageUrl?: string;
  isMissing?: boolean;
  realPosition: MartyprsPosition;
  militaryPosition?: string;
  homeTown?: string;
  deadPlace?: string;
  dateOfEnlistment?: string;
  no?: number;
  isMother?: boolean;
};
