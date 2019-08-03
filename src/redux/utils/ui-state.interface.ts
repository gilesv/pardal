export default interface IUiState {
  selectedStory: number,
  isDirty: boolean, // true if user made changes without exporting them
  [key: string]: any
}
