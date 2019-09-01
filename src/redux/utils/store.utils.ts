export const removeFromObject = (obj: any, prop: number | string): any => {
  let clone = { ...obj };
  delete clone[prop];
  return clone;
}


export const addToArray = (arr: any[], el: number | string, position: number): any => {
  if (position >= 0) {
    let clone = [...arr];
    clone.splice(position, 0, el);
    return clone;
  } else {
    return [...arr, el];
  }
}

export const removeFromArray = (arr: any[], el: number | string): any => {
  let clone = [...arr];
  clone.splice(clone.indexOf(el), 1);
  return clone;
}
