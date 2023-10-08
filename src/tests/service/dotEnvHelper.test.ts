import { DotEnvHelper } from "../../service/DotEnvHelper";

describe("Test get inquirer option", () => {
  test("Test get inquirer option", async () => {
    const actual = DotEnvHelper.getPromptOption("STORAGE_TYPE");
    // @see https://jestjs.io/docs/expect#tocontainequalite
    const expectedOption = [
      {
        type: "list",
        name: "context",
        message: "Which one do you want to configure",
        choices: ["local", "GitHub"],
        loop: false,
      },
    ];
    expect(DotEnvHelper.getPromptOption("STORAGE_TYPE")).toEqual(
      expectedOption
    );
  });
});
