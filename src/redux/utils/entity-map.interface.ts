export default interface IEntityMap<T> {
  [id: number]: T,
  next: number
};
