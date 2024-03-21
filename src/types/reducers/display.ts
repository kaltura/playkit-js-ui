export interface DisplayState {
  bottomBarControls: BottomBarControls;
}

export interface BottomBarControls {
  leftControls: {[controlName: string]: boolean};
  rightControls: {[controlName: string]: boolean};
}
