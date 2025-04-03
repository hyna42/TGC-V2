import sum from "./sum";

describe("sum", () => {
  it.only("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
