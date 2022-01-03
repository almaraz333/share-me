export const userQuery = (userId: string) => {
  return `*[type == "user" && _id ==${userId}]`;
};
