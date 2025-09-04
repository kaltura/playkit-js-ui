import {KalturaPlayer} from '@playkit-js/kaltura-player-js';

let activePlayer: KalturaPlayer | null = null;
let dualScreenPlayers: KalturaPlayer[] = [];

const setActivePlayer = (player: KalturaPlayer): void => {
  activePlayer = player;
};

const getActivePlayer = (): KalturaPlayer | null => {
  return activePlayer;
};

const setDualScreenPlayers = (players: KalturaPlayer[]): void => {
  dualScreenPlayers = players;
};

const getPipPlayer = (): KalturaPlayer | undefined => {
  return dualScreenPlayers.find(dualScreenPlayer => {
    if (dualScreenPlayer.isInPictureInPicture?.()) {
      return dualScreenPlayer;
    }
  });
};

export {setActivePlayer, getActivePlayer, setDualScreenPlayers, getPipPlayer};
