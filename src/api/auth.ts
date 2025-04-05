export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("authToken");  // Check if the token exists in localStorage
  return token != null;  // If token exists, user is authenticated
};

export const logout = (): void => {
  localStorage.removeItem("authToken"); // Remove token from localStorage
};
