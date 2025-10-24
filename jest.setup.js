require("@testing-library/jest-dom");

jest.mock("next/link", () => {
  return ({ children }) => children;
});
