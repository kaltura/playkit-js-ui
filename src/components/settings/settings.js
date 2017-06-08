//@flow
import { h } from 'preact';
import BaseComponent from '../base';
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
        <div className='menu top left'>
          <div className='menu-item select-menu-item'>
            <label htmlFor='quality'>Quality</label>
            <div className='dropdown top left'>
              <div className='dropdown-button'>Auto</div>
              <div className='dropdown-menu'>
                <div className='dropdown-menu-item active'>Auto</div>
                <div className='dropdown-menu-item'>720p</div>
                <div className='dropdown-menu-item'>480p</div>
              </div>
            </div>
          </div>
          <div className='menu-item select-menu-item'>
            <label htmlFor='speed'>Speed</label>
            <div className='dropdown top left'>
              <div className='dropdown-button'>Normal</div>
              <div className='dropdown-menu'>
                <div className='dropdown-menu-item active'>
                  <span>Normal</span>
                  <Icon type='check' />
                </div>
                <div className='dropdown-menu-item'>
                  <span>x1.5</span>
                </div>
                <div className='dropdown-menu-item'>
                  <span>x2</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsControl;
