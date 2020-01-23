module.exports = (tableInfo) => {
  const matchNumber = Math.floor(Math.random() * Math.floor(tableInfo.length));
  if (typeof tableInfo[matchNumber].time === "string") {
    return {
      tableInfo,
      matchesIsEnded: !tableInfo.find((info) => typeof info.time === "number")
    }
  }
  const hasGoal = Math.floor(Math.random() * Math.floor(2)) + 1 > 1;
  const commandNumber = Math.floor(Math.random() * Math.floor(2)) + 1;
  const isGetRedCard = Math.floor(Math.random() * Math.floor(2)) + 1 > 1;

  if (isGetRedCard) {
    const commandNumberWithCard = Math.floor(Math.random() * Math.floor(2) + 1);
    if (tableInfo[matchNumber][`command${commandNumberWithCard}`].redCardNumber < 5) {
      tableInfo[matchNumber][`command${commandNumberWithCard}`].redCardNumber++
    }
  }
  if (hasGoal) {
    tableInfo[matchNumber][`command${commandNumber}`].goals++;
  }

  if (typeof tableInfo[matchNumber].time === "number") {
    tableInfo[matchNumber].time++;
    if (tableInfo[matchNumber].time > 90) {
      tableInfo[matchNumber].time = 'окончен'
    }
  }

  tableInfo.forEach((match, index) => {
    if (match.time && index !== matchNumber) {
      if (typeof tableInfo[index].time === "number") {
        tableInfo[index].time++;
        if (tableInfo[index].time > 90) {
          tableInfo[index].time = 'окончен'
        }
      }
    }
  })

  return {
    tableInfo,
    matchesIsEnded: !tableInfo.find((info) => typeof info.time === "number")
  }
};
