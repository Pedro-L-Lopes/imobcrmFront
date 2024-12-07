import { useState } from "react";

export const useSort = ({
  defaultOrderBy = "",
  defaultSortDirection = "asc",
} = {}) => {
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [sortDirection, setSortDirection] = useState(defaultSortDirection);

  const handleSort = (field: string) => {
    if (orderBy === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(field);
      setSortDirection("asc");
    }
  };

  return { orderBy, sortDirection, handleSort };
};
