/* eslint-disable import/prefer-default-export */

export const isAuthenticated = () => Boolean(localStorage.getItem("SAAT_ACCESS_TOKEN"));
