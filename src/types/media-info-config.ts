export enum MediaInfoPosition {
  Top = 'top',
  Bottom = 'bottom'
}

export enum MediaInfoDetailsMode {
  None = 'none',
  Title = 'title',
  TitleAndDescription = 'titleAndDescription'
}

export interface MediaInfoConfig {
  showDuration?: boolean;
  detailsMode?: MediaInfoDetailsMode;
  position?: MediaInfoPosition;
}
