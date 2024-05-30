// For the phone to vanity conversion, I just googled the 10 most commonly used letters and created a makeshift dictionary, 
//   and assigned a number to its corresponding letter value

const digitToLetters = {
  '0': 'E',
  '1': 'T',
  '2': 'A',
  '3': 'O',
  '4': 'I',
  '5': 'N',
  '6': 'S',
  '7': 'R',
  '8': 'H',
  '9': 'L',
}

export function ConvertToVanity(phoneString) {
  let newVanityString = "";
  let lastSevenDigits = phoneString.replace("+", "").substr(6,12);
  let firstDigits = phoneString.substr(0,6);
  
  for(let i = 0; i < lastSevenDigits.length; i++){
    const digit = lastSevenDigits[i];
    
    if(digit in digitToLetters){
      const letter = digitToLetters[digit];
      newVanityString += letter;
    }
    else{
      console.error('no letter match')
    }
  }
  
  
  let newCompleteString = firstDigits + newVanityString;
  return newCompleteString;
}