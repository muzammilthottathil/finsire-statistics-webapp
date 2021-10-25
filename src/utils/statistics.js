// find mean
export const findMean = (data = []) =>
  (data.reduce((a, b) => a + b, 0) / data.length).toFixed(6);

// find median
export function findMedian(data = []) {
  if (data.length === 0) throw new Error("No inputs");

  data.sort((a, b) => a - b);
  var half = Math.floor(data.length / 2);

  if (data.length % 2) return data[half].toFixed(6);
  return ((data[half - 1] + data[half]) / 2).toFixed(6);
}

// find stdDev
export function findStdDev(data = []) {
  const n = data?.length;
  const mean = data?.reduce((a, b) => a + b) / n;
  return Math.sqrt(
    data.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n
  ).toFixed(6);
}

// find mode

export const findMode = (data = []) => {
  data = data.slice().sort((x, y) => x - y);

  var bestStreak = 1;
  var bestElem = data[0];
  var currentStreak = 1;
  var currentElem = data[0];

  for (let i = 1; i < data.length; i++) {
    if (data[i - 1] !== data[i]) {
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
        bestElem = currentElem;
      }

      currentStreak = 0;
      currentElem = data[i];
    }

    currentStreak++;
  }

  return currentStreak > bestStreak
    ? currentElem?.toFixed(6)
    : bestElem?.toFixed(6);
};
