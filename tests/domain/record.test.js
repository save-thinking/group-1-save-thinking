test("returns hello world", () => {
  expect(1 + 1).toBe(2);
});
// import { processNewRecord } from "src/js/services/domain/record.js";
// import {
//   InvalidAmountError,
//   ValidationError,
//   StorageError,
// } from "src/js/services/domain/exceptions.js";

// /*
// Testing:
// The following test was designed to ensure that the JSON object given to the Service Layer, from the View Layer, has the correct form.
// It must have valid record amount.
// We can test validateNewRecord() using the following inputs.

// If an input is successfully validated, then it will be passed to the database for storage.
// Therefore, we want validateNewRecord() to accept on the goodPassedInfo and reject on the badPassedInfo.
// Accepting means that we return nothing and simply continue to the storage phase. Rejecting means we throw an error.

// So first, our test checks that validateNewRecord(goodPassedInfo) throws no errors.
// Then, our test checks that ALL validateNewRecord(badPassedInfo) throw errors.
// If all of this happens, then validateNewRecord() is funcitoning as intended, and we output 'pass'.
// Otherwise, we have failed, and output 'fail'.

// If we want to test the function processNewRecord(), we will also need to import the addRecordToTable() function from the storage layer.
// Then we will call a similar test function to see that our goodPassedInfo gets saved correctly on the DB and the badPassedInfo receives an error in each case.

// Inputs:
// const goodPassedInfo = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"123456","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const goodPassedInfo = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"123456.78","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}

// const badPassedInfo = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"0","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badPassedInfo = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badPassedInfo = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"-1","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badPassedInfo = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"1.1.1","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// const badPassedInfo = {"record_type":"Expense","record_source_account":"BofA Account","record_destination_account":"BofA Account","record_amount":"123.4567","currency":"USD","record_note":"Sample Note.","record_created_time":"2018-07-22","record_tag":"Sample Tag"}
// */

// function testValidateNewRecord() {
//   const g_1 = {
//     record_type: "Expense",
//     record_source_account: "BofA Account",
//     record_destination_account: "BofA Account",
//     record_amount: "123456",
//     currency: "USD",
//     record_note: "Sample Note.",
//     record_created_time: "2018-07-22",
//     record_tag: "Sample Tag",
//   };
//   const g_2 = {
//     record_type: "Expense",
//     record_source_account: "BofA Account",
//     record_destination_account: "BofA Account",
//     record_amount: "123456.78",
//     currency: "USD",
//     record_note: "Sample Note.",
//     record_created_time: "2018-07-22",
//     record_tag: "Sample Tag",
//   };

//   const b_1 = {
//     record_type: "Expense",
//     record_source_account: "BofA Account",
//     record_destination_account: "BofA Account",
//     record_amount: "0",
//     currency: "USD",
//     record_note: "Sample Note.",
//     record_created_time: "2018-07-22",
//     record_tag: "Sample Tag",
//   };
//   const b_2 = {
//     record_type: "Expense",
//     record_source_account: "BofA Account",
//     record_destination_account: "BofA Account",
//     record_amount: "",
//     currency: "USD",
//     record_note: "Sample Note.",
//     record_created_time: "2018-07-22",
//     record_tag: "Sample Tag",
//   };
//   const b_3 = {
//     record_type: "Expense",
//     record_source_account: "BofA Account",
//     record_destination_account: "BofA Account",
//     record_amount: "-1",
//     currency: "USD",
//     record_note: "Sample Note.",
//     record_created_time: "2018-07-22",
//     record_tag: "Sample Tag",
//   };
//   const b_4 = {
//     record_type: "Expense",
//     record_source_account: "BofA Account",
//     record_destination_account: "BofA Account",
//     record_amount: "1.1.1",
//     currency: "USD",
//     record_note: "Sample Note.",
//     record_created_time: "2018-07-22",
//     record_tag: "Sample Tag",
//   };
//   const b_5 = {
//     record_type: "Expense",
//     record_source_account: "BofA Account",
//     record_destination_account: "BofA Account",
//     record_amount: "123.4567",
//     currency: "USD",
//     record_note: "Sample Note.",
//     record_created_time: "2018-07-22",
//     record_tag: "Sample Tag",
//   };

//   // Check all good inputs should work. If we throw as error then we fail.
//   try {
//     validateNewRecord(g_1);
//     validateNewRecord(g_2);
//   } catch (error) {
//     return "fail";
//   }

//   // Check that all of the bad inputs throw errors. If any do not throw errors, then we will fail.
//   try {
//     validateNewRecord(b_1);
//     return "fail";
//   } catch (error) {}

//   try {
//     validateNewRecord(b_2);
//     return "fail";
//   } catch (error) {}

//   try {
//     validateNewRecord(b_3);
//     return "fail";
//   } catch (error) {}

//   try {
//     validateNewRecord(b_4);
//     return "fail";
//   } catch (error) {}

//   try {
//     validateNewRecord(b_5);
//     return "fail";
//   } catch (error) {}
//   return "pass";
// }
