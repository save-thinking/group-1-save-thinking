import {
  addAccount,
  getAllUserAccounts,
  getAllAccounts,
} from "../../src/js/domain/account.js";
import * as accountStore from "../../src/js/storage/account.js";
import { ValidationError } from "../../src/js/domain/exceptions.js";

test("Add Account Happy Path", async () => {
  const accountInput = {
    name: "Citi",
    type: "savings-account",
    initial_balance: "3500",
    currency: "USD",
  };
  const accountOutput = {
    name: "Citi",
    type: "savings-account",
    initial_balance: 3500,
    currency: "USD",
    source: "USER",
    emoji: "🏥",
    current_balance: 3500,
    id: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
  };
  const spy = jest
    .spyOn(accountStore, "storeAccount")
    .mockReturnValue(accountOutput);
  const result = await addAccount(accountInput);
  expect(result).toEqual(accountOutput);
  expect(spy).toHaveBeenCalled();
});

test("Add Account Invalid Errors", async () => {
  let accountInput = {
    name: "",
    type: "savings-account",
    initial_balance: "3500",
    currency: "USD",
  };
  await expect(addAccount(accountInput)).rejects.toThrow(ValidationError);
  accountInput = {
    name: "citi",
    type: "savings-account",
    initial_balance: "",
    currency: "USD",
  };
  await expect(addAccount(accountInput)).rejects.toThrow(ValidationError);
  accountInput = {
    name: 1244,
    type: "savings-account",
    initial_balance: "42",
    currency: "USD",
  };
  await expect(addAccount(accountInput)).rejects.toThrow(ValidationError);
});

test("get all user accounts", async () => {
  const res = { toArray: () => [] };
  const spy = jest
    .spyOn(accountStore, "getAccountMulti")
    .mockResolvedValue(res);
  const result = await getAllUserAccounts();
  expect(result.length).toEqual(0);
  expect(spy).toHaveBeenCalled();
});

test("getAllAccounts", async () => {
  const res = { toArray: () => [] };
  const spy = jest
    .spyOn(accountStore, "getAccountMulti")
    .mockResolvedValue(res);
  const result = await getAllAccounts();
  expect(result.length).toEqual(0);
  expect(spy).toHaveBeenCalled();
});
