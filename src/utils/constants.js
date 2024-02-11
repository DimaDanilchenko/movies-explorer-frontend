export function handleChangeDuration(duration, movie) {
  if (duration < 60) {
    return `${movie.duration} мин`;
  }
  if (duration > 60 && duration < 120) {
    return `1 час ${movie.duration - 60} мин`;
  }

  if (duration > 120) {
    return `2 часа ${movie.duration - 120} мин`;
  }

  if (duration === 60) {
    return `1 час`;
  }
  if (duration === 120) {
    return `2 часа`;
  }
}

export const WIDTH_450PX = 450;
export const WIDTH_531PX = 531;
export const WIDTH_768PX = 768;
export const WIDTH_831PX = 831;
export const WIDTH_880PX = 880;
export const WIDTH_1025PX = 1025;
export const WIDTH_1260PX = 1260;
export const TIMEOUT = 1000;