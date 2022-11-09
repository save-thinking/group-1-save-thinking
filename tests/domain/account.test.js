test("returns hello world", () => {
  expect(1 + 1).toBe(2);
});
// import { processNewAccount } from "src/js/services/domain/account.js";
// import {
//   InvalidAmountError,
//   ValidationError,
//   StorageError,
// } from "src/js/services/domain/exceptions.js";

// /*
// Testing:
// The following test was designed to ensure that the JSON object given to the Service Layer, from the View Layer, has the correct form.
// It must have a valid account name and initial starting balance.

// We can test validateNewAccount() using the following inputs.
// If an input is successfully validated, then it will be passed to the database for storage.
// Therefore, we want validateNewAccount() to accept on the goodPassedInfo and reject on the badPassedInfo.
// Accepting means that we return nothing and simply continue. Rejecting means we throw an error.

// So first, our test checks that verifyNewAccount(goodPassedInfo) throws no errors.
// Then, our test checks that ALL verifyNewAccount(badPassedInfo) throw errors.
// If all of this happens, then verifyNewAccount() is funcitoning as intended, and we output 'pass'.
// Otherwise, we have failed.

// If we want to test the function processNewAccount(), we will also need to import the addAccountToTable() function from the storage layer.
// Then we will call a similar test function to see that our goodPassedInfo gets saved correctly on the DB and the badPassedInfo receives an error in each case.

// Inputs:
// const goodPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"12345","currency":"USD"}
// const goodPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"12345.67","currency":"USD"}
// const goodPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"0","currency":"USD"}

// const badPassedInfo = {"account_name":"","account_type":"checking-account","initial_balance":"0","currency":"USD"}
// const badPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"","currency":"USD"}
// const badPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"-1","currency":"USD"}
// const badPassedInfo = {"account_name":"Sample Account Name","account_type":"checking-account","initial_balance":"11234.234243","currency":"USD"}
// */

// function testValidateNewAccount() {
//   const g_1 = {
//     account_name: "Sample Account Name",
//     account_type: "checking-account",
//     initial_balance: "12345",
//     currency: "USD",
//   };
//   const g_2 = {
//     account_name: "Sample Account Name",
//     account_type: "checking-account",
//     initial_balance: "12345.67",
//     currency: "USD",
//   };
//   const g_3 = {
//     account_name: "Sample Account Name",
//     account_type: "checking-account",
//     initial_balance: "0",
//     currency: "USD",
//   };

//   const b_1 = {
//     account_name: "",
//     account_type: "checking-account",
//     initial_balance: "0",
//     currency: "USD",
//   };
//   const b_2 = {
//     account_name: "Sample Account Name",
//     account_type: "checking-account",
//     initial_balance: "",
//     currency: "USD",
//   };
//   const b_3 = {
//     account_name: "Sample Account Name",
//     account_type: "checking-account",
//     initial_balance: "-1",
//     currency: "USD",
//   };
//   const b_4 = {
//     account_name: "Sample Account Name",
//     account_type: "checking-account",
//     initial_balance: "11234.234243",
//     currency: "USD",
//   };

//   // Check all good inputs should work. If we throw as error then we fail.
//   try {
//     validateNewAccount(g_1);
//     validateNewAccount(g_2);
//     validateNewAccount(g_3);
//   } catch (error) {
//     return "fail";
//   }

//   // Check that all of the bad inputs throw errors. If any do not throw errors, then we will fail.
//   try {
//     validateNewAccount(b_1);
//     return "fail";
//   } catch (error) {}

//   try {
//     validateNewAccount(b_2);
//     return "fail";
//   } catch (error) {}

//   try {
//     validateNewAccount(b_3);
//     return "fail";
//   } catch (error) {}

//   try {
//     validateNewAccount(b_4);
//     return "fail";
//   } catch (error) {}
//   return "pass";
// }
