//@flow
import { h } from 'preact';
import BaseComponent from '../base';

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
          <svg viewBox='0 0 1024 1024'>
            <path d='M829.945 549.126c2.784-24.116 2.784-48.445 0.269-70.702-1.182-6.772-7.090-11.696-13.674-11.641-33.039 0.582-62.975-19.389-75.126-50.118s-3.971-65.772 20.504-87.92c4.293-3.894 4.818-10.455 1.003-15.228-14.831-18.927-31.796-36.079-50.521-51.087-4.614-3.687-11.301-3.148-16.127 2.145-15.732 16.059-37.322 25.023-59.382 24.831-9.828 0.044-19.574-1.802-29.307-5.686-30.997-13.082-50.429-44.232-48.535-78.046 0.365-5.803-3.87-10.878-9.583-11.551-23.919-2.769-48.074-2.831-71.958-0.192-5.836 0.654-10.191 5.68-10.009 11.47 1.121 33.146-18.329 63.547-49.925 76.834-8.987 3.423-18.538 5.129-27.498 5.028-22.472 0.224-44.067-8.707-60.526-25.487-2.197-2.386-5.29-3.748-8.24-3.758-2.663 0.016-5.248 0.905-7.105 2.334-19.136 15.052-36.496 32.233-51.558 50.977-3.729 4.732-3.187 11.536 1.058 15.449 24.89 22.573 32.935 58.34 19.426 90.928-14.22 29.886-44.875 48.43-77.941 47.151-5.576-0.215-10.363 3.934-11.003 10.013-2.916 24.025-2.916 48.315-0.231 70.764 1.178 6.84 7.155 11.808 14.518 11.713l2.428 0.007c31.565 0.659 59.701 20.063 71.6 49.499 12.239 30.769 4.278 65.898-20.252 88.586-4.217 3.829-4.736 10.275-0.976 14.991 14.777 18.932 31.665 36.115 50.227 51.128 4.694 3.762 11.505 3.223 16.349-2.081 15.725-16.101 37.337-25.092 59.378-24.895 9.894-0.057 19.705 1.819 29.5 5.78 30.753 13.169 50.063 44.084 48.378 77.965-0.373 5.795 3.857 10.867 9.602 11.539 23.908 2.78 48.053 2.842 71.923 0.192 5.851-0.659 10.215-5.702 10.027-11.562-1.088-33.118 18.371-63.473 49.584-76.583 9.014-3.552 18.622-5.354 27.841-5.307 22.555-0.225 44.218 8.804 60.434 25.505 2.224 2.395 5.343 3.76 8.371 3.769 2.474-0.012 4.874-0.847 6.896-2.43 19.227-14.971 36.653-32.121 51.726-50.848 3.737-4.743 3.194-11.563-0.941-15.379-24.391-21.907-32.789-56.564-21.134-87.207s40.964-50.957 73.904-51.116h5.704c5.586-0.028 10.269-4.227 10.905-9.777zM893.526 556.438c-4.321 37.715-36.171 66.271-74.323 66.464h-5.711c-6.33 0.031-11.99 3.953-14.24 9.87s-0.629 12.609 4.385 17.116c29.020 26.748 32.567 71.325 7.936 102.582-18.378 22.837-39.342 43.468-62.397 61.42-13.128 10.284-29.303 15.909-46.22 15.991-21.004-0.056-41.043-8.825-54.839-23.692-3.514-3.616-8.356-5.634-13.867-5.583-1.555-0.007-3.097 0.282-3.877 0.581-6.088 2.559-9.967 8.609-9.749 15.235 1.257 39.227-27.828 72.841-66.88 77.241-28.725 3.189-57.719 3.114-86.45-0.227-39.585-4.631-68.615-39.444-66.083-78.749 0.331-6.679-3.529-12.859-9.057-15.234-1.449-0.585-2.998-0.881-5.025-0.873-5.074-0.045-9.947 1.982-12.693 4.763-26.775 29.494-71.875 33.067-103.071 8.066-22.458-18.164-42.771-38.831-60.335-61.337-24.602-30.847-21.012-75.5 7.982-101.818 4.881-4.515 6.479-11.568 4.088-17.58-2.239-5.538-7.562-9.209-12.866-9.327-39.748 0.506-72.828-26.991-79.581-66.425-3.538-29.147-3.538-58.616-0.060-87.234 4.085-39.084 37.791-68.296 77.064-66.784 7.502 0.29 14.456-3.916 17.001-9.164 2.519-6.098 0.94-13.122-4.133-17.724-29.022-26.738-32.57-71.311-7.956-102.538 18.292-22.765 39.115-43.375 62.322-61.626 13.199-10.169 29.368-15.731 46.323-15.833 21.063 0.065 41.146 8.908 54.704 23.656 3.559 3.623 8.44 5.642 14.175 5.592 1.605 0.017 3.199-0.268 3.668-0.426 6.11-2.574 9.998-8.651 9.771-15.356-1.228-39.209 27.864-72.786 66.897-77.161 28.715-3.173 57.697-3.098 86.456 0.231 39.539 4.653 68.54 39.409 66.051 78.92-0.369 6.596 3.446 12.713 8.931 15.035 1.507 0.6 3.114 0.905 5.156 0.898 5.087 0.044 9.973-1.985 12.671-4.704 26.66-29.444 71.625-33.068 102.694-8.244 22.604 18.117 43.043 38.781 60.715 61.337 24.728 30.927 21.142 75.751-8.215 102.378-4.724 4.275-6.301 11.031-3.958 16.955s8.114 9.775 14.774 9.659c38.18-0.325 70.992 27.018 77.822 66.463 3.343 28.966 3.343 58.22 0 87.185zM511.951 597.037c47.144-0.118 85.24-38.367 85.169-85.511 0-34.617-20.872-65.819-52.867-79.034s-68.802-5.836-93.231 18.69c-24.429 24.527-31.66 61.363-18.317 93.305s44.628 52.688 79.245 52.55zM512.158 661.036c-60.477 0.242-115.178-36.032-138.507-91.881s-10.686-120.254 32.026-163.138c42.712-42.884 107.066-55.785 163.008-32.679s92.434 77.661 92.434 138.139c0.124 82.417-66.545 149.353-148.962 149.559z' />
          </svg>
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
                  <svg className='check-icon' style='width:24px;height:24px' viewBox='0 0 1024 1024'>
                    <path d='M342.481 563.894c-12.577-12.416-32.838-12.285-45.254 0.292s-12.285 32.838 0.292 45.254l118.857 117.333c13.275 13.105 34.901 12.123 46.933-2.131l297.143-352c11.4-13.505 9.694-33.694-3.811-45.094s-33.694-9.694-45.094 3.811l-274.828 325.566-94.238-93.030z' />
                  </svg>
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
