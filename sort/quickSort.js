function quickSort(arr) {
  // Base case: If the array has one or no elements, it is already sorted.
  if (arr.length <= 1) return arr;

  // Choosing the first element in the array as the pivot.
  const pivot = arr[0];
  // Creating two empty arrays to store elements less than (left) and greater than (right) the pivot.
  const left = [];
  const right = [];

  // Looping through the array, starting from the second element because the first is the pivot.
  for (let i = 1; i < arr.length; i++) {
    // If the current element is greater than the pivot, push it to the 'left' array.
    if (arr[i] > pivot) left.push(arr[i]);
    // If the current element is less than or equal to the pivot, push it to the 'right' array.
    else right.push(arr[i]);
  }

  // Concatenate the result of recursively sorting the 'left' array, the pivot, and then the 'right' array.
  // Spread syntax '...' is used to concatenate arrays.
  return [...quickSort(left), pivot, ...quickSort(right)];
}

module.exports = quickSort;
