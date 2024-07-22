export function removeDuplication(array) {
  let clearArray = [];
  for (let i = 0; i < array?.length; i++) {
    let found = false;
    for (let j = 0; j < clearArray.length; j++) {
      if (array[i] === clearArray[j]) {
        found = true;
      }
    }
    if (found === false) {
      clearArray.push(array[i]);
    }
  }
  return clearArray;
}
