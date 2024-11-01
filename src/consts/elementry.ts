export const ELEMENTRY_LAYOUT = {
  LTR: "LTR",
  RTL: "RTL",
} as const;

export const MAPPING_GRAVE_LABEL_TO_FIELD = [
  {
    label: "Liệt sĩ",
    field: "name",
  },
  {
    label: "Ngày sinh",
    field: "yearOfBirth",
  },
  {
    label: "Quê quán",
    field: "homeTown",
  },
  {
    label: "Ngày nhập ngũ",
    field: "dateOfEnlistment",
  },

  {
    label: "Chức vụ",
    field: "militaryPosition",
  },
  {
    label: "Ngày hy sinh",
    field: "deadDate",
  },
  {
    label: "Nơi hy sinh",
    field: "deadPlace",
  },
];

export const MAPPING_MOTHER_LABEL_TO_FIELD = [
  {
    label: "Mẹ Việt Nam anh hùng",
    field: "name",
  },
  {
    label: "Ngày sinh",
    field: "yearOfBirth",
  },
  {
    label: "Quê quán",
    field: "homeTown",
  },
  {
    label: "Ngày mất",
    field: "deadDate",
  },
];
