/*
# Name:                         sorter.mjs
# Author:                       Michael Sineiro
# Date of latest revision:      2/19/25
# Purpose:                      using my own array to easily sort
#                               the numbers in an array in ascending order.
#                           
#           (thanks Tabnine)
#   Note: This script assumes that the input array only contains numbers.
#       If you want to handle other types of data, you'll need to modify the loop.
#       Also, this script does not handle negative numbers.
#
#       The script also does not handle the case where the input array is empty.
#       If you want to handle that case, you'll need to add a condition to check 
        if the array is empty before proceeding.
*/

function sortEvens(numArray) {
    //array for even numbers
    let evens = [];
    
    // Iterate over numArray and push even numbers to evens array
    for (let i = 0; i < numArray.length; i++) {
        if (numArray[i] % 2 === 0) {
            evens.push(numArray[i]);
        }
    }
    
    // Sort the evens array in ascending order
    evens.sort((a, b) => a - b);
    
    // Return the sorted array of even numbers
    return evens;
}

console.log("Testing sortEvens()...");
let nums = [4, 2, 9, 1, 8];
let evenNums = sortEvens(nums);
console.log(evenNums); // [2, 4, 8]

// Do NOT remove the following line:
export default sortEvens;
