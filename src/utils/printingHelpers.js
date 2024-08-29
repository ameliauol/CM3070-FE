export const getDurationUnit = (duration) => {
  if (duration < 60) {
    return `${duration} mins`;
  } else if (duration < 120) {
    const minutes = duration % 60;
    return minutes == 0
      ? `1 hour (${duration} mins)`
      : `1 hour ${minutes} minutes (${duration} mins)`;
  } else if (duration % 60 === 0) {
    return `${duration / 60} hrs (${duration} minutes)`;
  } else {
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours} hours ${minutes} minutes (${duration} minutes)`;
  }
};

export const printProgrammeDifficultyLevel = (difficultyLevel) => {
  return difficultyLevel.slice(0, 1).toUpperCase() + difficultyLevel.slice(1);
};
