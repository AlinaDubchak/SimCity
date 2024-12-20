import { Game } from './game';
import { SimObject } from './sim/simObject';
import playIconUrl from '/icons/play-color.png';
import pauseIconUrl from '/icons/pause-color.png';

export class GameUI {
  constructor() {
    /**
     * Currently selected tool
     * @type {string}
     */
    this.activeToolId = 'select';

    /**
     * @type {HTMLElement | null}
     */
    this.selectedControl = document.getElementById('button-select');

    /**
     * True if the game is currently paused
     * @type {boolean}
     */
    this.isPaused = false;

    this.initEventListeners();
  }

  get gameWindow() {
    return document.getElementById('render-target');
  }

  showLoadingText() {
    this.toggleVisibility('loading', true);
  }

  hideLoadingText() {
    this.toggleVisibility('loading', false);
  }

  toggleVisibility(elementId, isVisible) {
    const element = document.getElementById(elementId);
    if (element) {
      element.style.visibility = isVisible ? 'visible' : 'hidden';
    }
  }

  /**
   * Handles tool selection logic
   * @param {Event} event
   */
  onToolSelected(event) {
    const target = event.target.closest('[data-type]');
    if (!target) return;

    // Deselect previous tool
    if (this.selectedControl) {
      this.selectedControl.classList.remove('selected');
    }

    // Select new tool
    this.selectedControl = target;
    this.selectedControl.classList.add('selected');

    this.activeToolId = this.selectedControl.getAttribute('data-type');
  }

  togglePause() {
    this.isPaused = !this.isPaused;

    const pauseIcon = document.getElementById('pause-button-icon');
    const pausedText = document.getElementById('paused-text');

    if (pauseIcon) {
      pauseIcon.src = this.isPaused ? playIconUrl : pauseIconUrl;
    }

    this.toggleVisibility('paused-text', this.isPaused);
  }

  /**
   * Updates the values in the title bar
   * @param {Game} game
   */
  updateTitleBar(game) {
    this.updateElementContent('city-name', game.city.name);
    this.updateElementContent('population-counter', game.city.population);

    const date = new Date('1/1/2023');
    date.setDate(date.getDate() + game.city.simTime);
    this.updateElementContent('sim-time', date.toLocaleDateString());
  }

  /**
   * Updates the info panel with the information in the object
   * @param {SimObject} object
   */
  updateInfoPanel(object) {
    const infoElement = document.getElementById('info-panel');
    if (!infoElement) return;

    if (object) {
      infoElement.style.visibility = 'visible';
      infoElement.innerHTML = object.toHTML();
    } else {
      infoElement.style.visibility = 'hidden';
      infoElement.innerHTML = '';
    }
  }

  initEventListeners() {
    document.addEventListener('click', (event) => {
      if (event.target.matches('[data-type]')) {
        this.onToolSelected(event);
      }

      if (event.target.id === 'pause-button') {
        this.togglePause();
      }
    });
  }

  /**
   * Updates the inner HTML content of a specified element
   * @param {string} elementId
   * @param {string | number} content
   */
  updateElementContent(elementId, content) {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = content;
    }
  }
}

window.ui = new GameUI();
