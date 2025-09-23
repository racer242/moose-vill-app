export const getScoreTitleInGenitive = (a) => {
  if (a >= 5 && a <= 19) return "очков";
  if (a % 10 == 1) return "очко";
  if ([1, 2, 3, 4].includes(a % 10)) return "очка";
  if ([5, 6, 7, 8, 9, 0].includes(a % 10)) return "очков";
};

export const getAttemptsTitleInGenitive = (a) => {
  if (a >= 5 && a <= 19) return "попыток";
  if (a % 10 == 1) return "попытка";
  if ([1, 2, 3, 4].includes(a % 10)) return "попытки";
  if ([5, 6, 7, 8, 9, 0].includes(a % 10)) return "попыток";
};
