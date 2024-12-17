import { Game } from './game';
import { SimObject } from './sim/simObject';
import playIconUrl from '/icons/play-color.png';
import pauseIconUrl from '/icons/pause-color.png';

export class GameUI {
  activeToolId = 'select';

  selectedControl = document.getElementById('button-select');

  isPaused = false;

  get gameWindow() {
    return document.getElementById('render-target');
  }

  showLoadingText() {
    document.getElementById('loading').style.visibility = 'visible';
  }

  hideLoadingText() {
    document.getElementById('loading').style.visibility = 'hidden';
  }

  onToolSelected(event) {
    if (this.selectedControl) {
      this.selectedControl.classList.remove('selected');
    }
    this.selectedControl = event.target;
    this.selectedControl.classList.add('selected');

    this.activeToolId = this.selectedControl.getAttribute('data-type');
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (this.isPaused) {
      document.getElementById('pause-button-icon').src = playIconUrl;
      document.getElementById('paused-text').style.visibility = 'visible';
    } else {
      document.getElementById('pause-button-icon').src = pauseIconUrl;
      document.getElementById('paused-text').style.visibility = 'hidden';
    }
  }

  updateTitleBar(game) {
    document.getElementById('city-name').innerHTML = game.city.name;
    document.getElementById('population-counter').innerHTML =
      game.city.population;

    const date = new Date('1/1/2023');
    date.setDate(date.getDate() + game.city.simTime);
    document.getElementById('sim-time').innerHTML = date.toLocaleDateString();
  }

  updateInfoPanel(object) {
    const infoElement = document.getElementById('info-panel');
    if (object) {
      infoElement.style.visibility = 'visible';
      infoElement.innerHTML = object.toHTML();
    } else {
      infoElement.style.visibility = 'hidden';
      infoElement.innerHTML = '';
    }
  }
}

window.ui = new GameUI();
