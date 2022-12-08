import { addRecord, getAllRecords } from "../../src/js/domain/record";
import { InvalidAmountError } from "../../src/js/domain/exceptions";
import * as accountStore from "../../src/js/storage/account.js";
import * as recordStore from "../../src/js/storage/record.js";
test("add new record happy path", async () => {
  const record_input = {
    type: "expense",
    source_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    destination_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    amount: "1200",
    currency: "USD",
    note: "Rent",
    created_at: "2018-07-22",
    tag: "",
  };
  const dummy_account = {
    name: "Citi",
    type: "savings-account",
    initial_balance: 3500,
    currency: "USD",
    source: "USER",
    emoji: "🏥",
    current_balance: 2300,
    id: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
  };
  const record_intermediate = {
    type: "expense",
    source_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    destination_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    amount: "1200.00",
    currency: "USD",
    note: "Rent",
    created_at: "2018-07-22",
    tag: "",
    id: "24aef6a0-899a-43b9-a727-dfe032647991",
  };
  const record_output = {
    type: "expense",
    source_account: {
      name: "Citi",
      type: "savings-account",
      initial_balance: 3500,
      currency: "USD",
      source: "USER",
      emoji: "🏥",
      current_balance: 2300,
      id: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    },
    destination_account: {
      name: "Citi",
      type: "savings-account",
      initial_balance: 3500,
      currency: "USD",
      source: "USER",
      emoji: "🏥",
      current_balance: 2300,
      id: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    },
    amount: "1200.00",
    currency: "USD",
    note: "Rent",
    created_at: "2018-07-22",
    tag: "",
    id: "24aef6a0-899a-43b9-a727-dfe032647991",
  };
  const storeRecord_spy = jest
    .spyOn(recordStore, "storeRecord")
    .mockReturnValue(record_intermediate);
  const getAccount_source_spy = jest
    .spyOn(accountStore, "getAccount")
    .mockReturnValue(dummy_account);
  const result = await addRecord(record_input);
  expect(result).toEqual(record_output);
  expect(storeRecord_spy).toHaveBeenCalled();
  expect(getAccount_source_spy).toHaveBeenCalled();
});

test("add new record invalid amount", async () => {
  const record_input = {
    type: "expense",
    source_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    destination_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    amount: "-200",
    currency: "USD",
    note: "Rent",
    created_at: "2018-07-22",
    tag: "",
  };
  await expect(addRecord(record_input)).rejects.toThrow(InvalidAmountError);
});

test("get all records empty", async () => {
  const res = { toArray: () => [] };
  const spy = jest.spyOn(recordStore, "getAllRecords").mockResolvedValue(res);
  const result = await getAllRecords();
  expect(result.length).toEqual(0);
  expect(spy).toHaveBeenCalled();
});

test("get all records empty", async () => {
  const record_intermediate = {
    type: "expense",
    source_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    destination_account: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
    amount: "1200.00",
    currency: "USD",
    note: "Rent",
    created_at: "2018-07-22",
    tag: "",
    id: "24aef6a0-899a-43b9-a727-dfe032647991",
  };
  const dummy_account = {
    name: "Citi",
    type: "savings-account",
    initial_balance: 3500,
    currency: "USD",
    source: "USER",
    emoji: "🏥",
    current_balance: 2300,
    id: "ae2b0187-6521-4d61-8cdb-dbee0a126958",
  };
  const res = { toArray: () => [record_intermediate] };
  const getAccount_source_spy = jest
    .spyOn(accountStore, "getAccount")
    .mockReturnValue(dummy_account);
  const spy = jest.spyOn(recordStore, "getAllRecords").mockResolvedValue(res);
  const result = await getAllRecords();
  expect(result.length).toEqual(1);
  expect(spy).toHaveBeenCalled();
  expect(getAccount_source_spy).toHaveBeenCalled();
});
