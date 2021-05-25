import { createElement } from '../utils/index.js';

export class Player {
	constructor(props) {
		console.log('Player');
		console.log(props);
		this.player = props.player;
		this.name = props.name;
		this.hp = props.hp;
		this.img = props.img;
		this.selector = `player${this.player}`;
		this.rootSelector = props.rootSelector;
	}

	changeHP = (deltaHP) => {
		this.hp = this.hp > deltaHP ? this.hp - deltaHP : 0;	
	}

	elHP = () => {
		return document.querySelector(`.${this.selector}  .life`);
	}

	renderHP = () => {
		this.elHP().style.width = `${this.hp}%`;
	}

	createPlayer = () => {
		const $player = createElement('div', this.selector);
		const $progressbar = createElement('div', 'progressbar');
		const $character = createElement('div', 'character');
		const $life = createElement('div', 'life');
		const $name = createElement('div', 'name');
		const $img = createElement('img');

		$life.style.width = `${this.hp}%`;
		$name.innerText = this.name;
		$img.src = this.img;

		$progressbar.appendChild($life);
		$progressbar.appendChild($name);


		$character.appendChild($img);

		$player.appendChild($progressbar);
		$player.appendChild($character);

		const $root = document.querySelector(`.${this.rootSelector}`);
		$root.appendChild($player);
		return $player;
	};
}

export default Player;