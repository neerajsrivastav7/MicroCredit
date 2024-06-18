import {ConvertUserFormToJson} from "../Common/JsonConverter"
export function ConvertIntoJson(FormData) {
  // Example function to demonstrate JSON conversion and saving
  var JsonData = ConvertUserFormToJson(
    FormData.name,
    FormData.subName,
    FormData.mobileNumber,
    FormData.address,
    FormData.emailId,
    FormData.startDate,
    FormData.endDate,
    FormData.noOfDays,
    FormData.registerDay,
    FormData.givenAmount,
    FormData.dailyGivenAmount,
    FormData.proInfo
  );
  return JsonData;
}
