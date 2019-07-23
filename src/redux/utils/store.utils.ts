
export const removeFromObject = (obj: any, prop: number | string): any => {
  let clone = { ...obj };
  delete clone[prop];
  return clone;
}

export const removeFromArray = (arr: any[], el: number | string): any => {
  let clone = [...arr];
  clone.splice(clone.indexOf(el), 1);
  return clone;
}
