import moment from 'moment';

export function getColor(newValue) {
  if (newValue === 'Done') {
    return '#00c875';
  }
  else if (newValue === 'Ready for testing') {
    return '#0086c0';
  }
  else if (newValue === 'Working on it') {
    return '#fdab3d';
  }
  else if (newValue === 'Work needed (rejected)') {
    return '#a25ddc';
  }
  else if (newValue === `Need help (I'm stuck)`) {
    return '#e2445c';
  }
  else if (newValue === 'To do') {
    return '#c4c4c4'
  }
  else if (newValue === 'Cancelled') {
    return '#a00037'
  }
}

export function getPrioColor(prioValue) {
  if (prioValue === 'High') {
    return 'rgba(216,44,74,0.9)';
  }
  else if (prioValue === 'Medium') {
    return 'rgba(251,155,48,0.9)';
  }
  else if (prioValue === 'Low') {
    return 'rgba(25,192,98,0.9)';
  }
  else if (prioValue === 'Best effort') {
    return 'rgba(14,114,178,0.9)';
  }
}

export function getImgSrc(personName) {
  if (personName === 'Yannick Frisart') {
    return 'https://20578.tk/board/user-profilepics/yannick.png';
  }
  else if (personName === 'Thijs van Rijn') {
    return 'https://20578.tk/board/user-profilepics/thijs.png';
  }
  else if (personName === 'Rick Woltheus') {
    return 'https://20578.tk/board/user-profilepics/rick.png';
  }
  else if (personName === 'Coen Filipsen') {
    return 'https://20578.tk/board/user-profilepics/coen.png';
  }
  else if (personName === 'Maurice') {
    return 'https://20578.tk/board/user-profilepics/maurice.png';
  }
  else if (personName === 'Patrick') {
    return 'https://20578.tk/board/user-profilepics/patrick.png';
  }
  return 'https://20578.tk/board/user-profilepics/none.png';
}

export function formatDate(date) {
  let formattedDate = moment(date, 'DD/MM/YY').format('MMMM D, YYYY');
  if (formattedDate === 'Invalid date') {
    return date;
  }
  return formattedDate;
}