// src/utils/handleTokenError.test.js
import { describe, test, expect, jest } from "@jest/globals";
import { handleTokenError } from "./handleTokenError";

describe("handleTokenError", () => {
  // No need to mutate global location; pass a stub location object instead.

  test("redirects to login with next param and returns true when error is 'The access token expired'", () => {
    const loc = {
      origin: "http://localhost:3000",
      pathname: "/dashboard",
      search: "?foo=bar",
      hash: "#section"
    };
    const navigate = jest.fn();
    const error = "The access token expired";
    const result = handleTokenError(error, navigate, loc);

    const expectedNext = encodeURIComponent("http://localhost:3000/dashboard?foo=bar#section");
    expect(navigate).toHaveBeenCalledWith(`/login?next=${expectedNext}`, { replace: true });
    expect(result).toBe(true);
  });

  test("does not redirect and returns false when error is not 'The access token expired'", () => {
    const loc = {
      origin: "http://localhost:3000",
      pathname: "/dashboard",
      search: "",
      hash: ""
    };
    const navigate = jest.fn();
    const error = "Some other error";
    const result = handleTokenError(error, navigate, loc);

    expect(navigate).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });

  test("does not redirect and returns false when error is null", () => {
    const loc = {
      origin: "http://localhost:3000",
      pathname: "/",
      search: "",
      hash: ""
    };
    const navigate = jest.fn();
    const error = null;
    const result = handleTokenError(error, navigate, loc);

    expect(navigate).not.toHaveBeenCalled();
    expect(result).toBe(false);
  });
});