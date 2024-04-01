export const isTextIncludedInData = <T extends object = object>(
  searchText: string,
  data: Partial<T>,
) => {
  return Object.values(data)
    .join(" ")
    .toLowerCase()
    .includes(searchText.toLowerCase());
};
