export const dateFormat = (upcomingDate) => {
  const originalDate = new Date(upcomingDate);
  const formattedDate = `${
    originalDate.getMonth() + 1
  }/${originalDate.getDate()}/${originalDate.getFullYear()}`;
  return formattedDate;
};
