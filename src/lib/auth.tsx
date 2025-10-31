import axios from "axios";

export const setCookie = (name: string, value: string, minutes: number = 30) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + minutes * 60 * 1000);
  document.cookie = `${name} = ${value}; path=/; expires=${expires.toUTCString()}`;
};

export const getCookie = (name: string): string | null => {
  return (
    document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${name}=`))
      ?.split("=")[1] || null
  );
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 2026 00:00:00 UTC`;
};

export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const res = await axios.get("/api/auth/profile");
    return res.data.isAuthenticated;
  } catch {
    return false;
  }
};

export const logout = async (router?: any) => {
  try {
    await axios.post("/api/auth/logout");

    if (router) {
      router.push("/login");
    } else {
      window.location.href = "/login";
    }
  } catch (error) {
    console.error("Error during logout:", error);
  }
};
