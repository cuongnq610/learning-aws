export const toSlug = (str: string) => {
  // to lowercase
  str = str.toLowerCase();

  // remove marks
  str = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // replace đĐ => d
  str = str.replace(/[đĐ]/g, "d");

  // remove special character
  str = str.replace(/([^0-9a-z-\s])/g, "");

  // replace whitespace to dash
  str = str.replace(/(\s+)/g, "-");

  // remove rebundant whitespace character
  str = str.replace(/-+/g, "-");

  // remove rebundant whitespace characters at the beginning and end
  str = str.replace(/^-+|-+$/g, "");

  return str;
};
