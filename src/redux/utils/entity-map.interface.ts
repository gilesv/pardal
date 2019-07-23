export default interface IEntityMap<T> {
  entities: {
    [key: number]: T
  },
  ids: number[]
};
