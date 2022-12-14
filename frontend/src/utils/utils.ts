export const formatDate = (date: string): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleString("en-GB", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};
