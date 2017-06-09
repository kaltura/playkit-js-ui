//@flow
import { h } from 'preact';
import BaseComponent from '../base';
import SmartContainer from '../smart-container/smart-container';
import Icon from '../icon/icon';

class SettingsControl extends BaseComponent {
  _playerElement: HTMLElement;
  _settingsControlElement: HTMLElement;
  _settingsControlButtonElement: HTMLElement;
  _settingsMenuElement: HTMLElement;
  _menuState: boolean;

  constructor(obj: IControlParams) {
    super({name: 'Settings', player: obj.player});
  }

  componentDidMount() {
    this._playerElement = document.getElementsByClassName('player')[0];
    this._settingsControlElement = document.getElementsByClassName('control-settings')[0];
    this._settingsControlButtonElement = this._settingsControlElement.getElementsByClassName('control-button')[0];
    this._settingsMenuElement = this._settingsControlElement.getElementsByClassName('menu')[0];
    this._menuState = false;

    this._settingsControlButtonElement.addEventListener('click', () => {
      this._menuState = !this._menuState;
      if (this._menuState) {
        this._playerElement.classList.add('menu-active');
        this._settingsMenuElement.classList.add('active');
      } else {
        this._playerElement.classList.remove('menu-active');
        this._settingsMenuElement.classList.remove('active');
      }
    });

    document.getElementsByClassName('dropdown-button')[1].addEventListener('click', () => {
      if (document.getElementsByClassName('dropdown')[1].classList.contains('active')) {
        document.getElementsByClassName('dropdown')[1].classList.remove('active');
      }
      else {
        document.getElementsByClassName('dropdown')[1].classList.add('active');
      }
    })
  }

  render() {
    return (
      <div className='control-button-container control-settings'>
        <button className='control-button' aria-label='Settings'>
          <Icon type='settings' />
        </button>
        <SmartContainer />
      </div>
    )
  }
}

export default SettingsControl;
