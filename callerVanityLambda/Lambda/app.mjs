import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";
import { ConvertToVanity } from "./utilities/vanity-utility.mjs";


const client = new DynamoDBClient({});

const dynamo = DynamoDBDocumentClient.from(client);
  

export const handler = async (event) => {
  
  let callerNumber = event['Details']['Parameters']['phoneNumber'];
  
  const tableName = "CallerAndVanity";
  
  let resultMap = {
    vanity1: "",
    vanity2: "",
    vanity3: "",
    vanity4: "",
    vanity5: ""
  }
  
  let putResults = {};
  
  let callerVanity = ConvertToVanity(callerNumber);
  
  try {
    putResults = await dynamo.send(
    new PutCommand({
      TableName: tableName,
      Item: {
        PhoneNumber: callerNumber,
        VanityString: callerVanity,
        CallDate: new Date().toLocaleString()
        },
      })
    );
    console.log(putResults);
  }
    
  catch(error){
    console.error("Error saving caller and vanity", error);
    return error;
  }
  
  var stringArray = [];
  
  try{
      var res = await dynamo.send(
        new ScanCommand({TableName: tableName})
      );
      
      // Removing the vanity that we just created/already have from the list, so that we can just use any others from the list
      stringArray = res.Items.filter(item => {
        return item.vanityString != callerVanity
      }).map(vanity => vanity.VanityString);

      
      // With more time, I would've created a method that tries to find a better vanity match for the caller, based on the caller's vanity and the vanities we have saved already
      resultMap.vanity1 = callerVanity;
      if(stringArray.length >= 4){
        resultMap.vanity2 = stringArray[0];
        resultMap.vanity3 = stringArray[1];
        resultMap.vanity4 = stringArray[2];
        resultMap.vanity5 = stringArray[3];
      }
      console.log(stringArray, resultMap);
    }
    
    
  catch (error) {
    console.error("Error getting vanities", error);
    return error;
  }
  
  
  return resultMap;
};


