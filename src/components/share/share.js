//@flow
import { h } from 'preact';
import BaseComponent from './base';

class ShareControl extends BaseComponent {
  _playerGuiElement: HTMLElement;
  _shareControlElement: HTMLElement;
  _shareControlButtonElement: HTMLElement;
  _shareOverlayElement: HTMLElement;
  _shareOverlayCloseButtonElement: HTMLElement;
  _shareOverlayActive: boolean;

  constructor(obj: IControlParams) {
    super({name: 'Share', player: obj.player});
  }

  componentDidMount() {
    this._playerGuiElement = document.getElementsByClassName('player-gui')[0];
    this._shareControlElement = document.getElementsByClassName('control-share')[0];
    this._shareControlButtonElement = this._shareControlElement.getElementsByClassName('control-button')[0];
    this._shareOverlayElement = document.getElementsByClassName('share-overlay')[0];
    this._shareOverlayCloseButtonElement = this._shareOverlayElement.getElementsByClassName('close-overlay')[0];
    this._shareOverlayActive = false;

    this._shareControlButtonElement.addEventListener("click", () => {
      this._shareOverlayActive = !this._shareOverlayActive;
      if (this._shareOverlayActive) {
        this._shareOverlayElement.classList.add('active');
        this._playerGuiElement.classList.add('overlay-active');
      }
      else {
        this._shareOverlayElement.classList.remove('active');
        this._playerGuiElement.classList.remove('overlay-active');
      }
    });

    this._shareOverlayCloseButtonElement.addEventListener("click", () => {
      this._shareOverlayActive = !this._shareOverlayActive;
      this._shareOverlayElement.classList.remove('active');
      this._playerGuiElement.classList.remove('overlay-active');
    })
  }

  render() {
      return (
        <div className="control-button-container control-share">
          <button className="control-button control-button-rounded" aria-label="Share">
            <svg style="width:32px;height:32px" viewBox="0 0 1024 1024">
                <path d="M318.641 446.219l236.155-142.257c-0.086-1.754-0.129-3.52-0.129-5.295 0-58.91 47.756-106.667 106.667-106.667s106.667 47.756 106.667 106.667c0 58.91-47.756 106.667-106.667 106.667-33.894 0-64.095-15.808-83.633-40.454l-236.467 142.445c-0.132-3.064-0.394-6.095-0.779-9.087l7.271-12.835-0.117 53.333-7.183-12.743c0.399-3.046 0.67-6.131 0.806-9.252l236.467 142.383c19.538-24.648 49.741-40.457 83.636-40.457 58.91 0 106.667 47.756 106.667 106.667s-47.756 106.667-106.667 106.667c-58.91 0-106.667-47.756-106.667-106.667 0-1.775 0.043-3.539 0.129-5.293l-236.19-142.216c-19.528 24.867-49.868 40.841-83.939 40.841-58.91 0-106.667-47.756-106.667-106.667s47.756-106.667 106.667-106.667c34.091 0 64.447 15.993 83.974 40.886zM234.667 554.667c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 341.333c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667zM661.333 768c23.564 0 42.667-19.103 42.667-42.667s-19.103-42.667-42.667-42.667c-23.564 0-42.667 19.103-42.667 42.667s19.103 42.667 42.667 42.667z"></path>
            </svg>
          </button>
        </div>
      )
  }
}

export default ShareControl;
