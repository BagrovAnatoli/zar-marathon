import { player1, player2 } from './player.js';
import { createElement, generateLogs, createReloadButton } from './utils.js';
import { enemyAttack, playerAttack, playerWins } from './utils.js';

class Game{
	constructor(){
		this.$arenas = document.querySelector('.arenas');
		this.$formButton = document.querySelector('.button');
		this.$formFight = document.querySelector('.control');
		this.$chat = document.querySelector('.chat');

		this.$arenas.appendChild(this.createPlayer(player1));
		this.$arenas.appendChild(this.createPlayer(player2));
	}
	start = () => {
		console.log('start');

		generateLogs(this.$chat, 'start', player1, player2);

		this.$formFight.addEventListener('submit', this.fightHandler);
	}

	createPlayer = ({ player, hp, name, img }) => {
		const $player = createElement('div', `player${player}`);
		const $progressbar = createElement('div', 'progressbar');
		const $character = createElement('div', 'character');
		const $life = createElement('div', 'life');
		const $name = createElement('div', 'name');
		const $img = createElement('img');

		$life.style.width = `${hp}%`;
		$name.innerText = name;
		$img.src = img;

		$progressbar.appendChild($life);
		$progressbar.appendChild($name);


		$character.appendChild($img);

		$player.appendChild($progressbar);
		$player.appendChild($character);

		return $player;
	};

	fightHandler = (event) => {
		event.preventDefault();
		const {value: enemyValue, hit: enemyHit, defence: enemyDefence} = enemyAttack();

		const {value, hit, defence} = playerAttack(this.$formFight);
		console.log('####: a', {value, hit, defence});
		console.log('####: e', {value: enemyValue, hit: enemyHit, defence: enemyDefence});

		if (defence !== enemyHit) {
			player1.changeHP(enemyValue);
			player1.renderHP();
			console.log('неудачная защита');
			generateLogs(this.$chat, 'hit', player2, player1, enemyValue);
		} else {
			console.log('удачная защита');
			generateLogs(this.$chat, 'defence', player2, player1);
		}
		if (enemyDefence !== hit) {
			player2.changeHP(value);
			player2.renderHP();
			console.log('успешная атака');
			generateLogs(this.$chat, 'hit', player1, player2, value);
		} else {
			console.log('неудачная атака');
			generateLogs(this.$chat, 'defence', player1, player2);
		}
		
		this.showResult();
	};

	showResult = () => {
		if (player1.hp === 0 || player2.hp === 0) {
			this.$formButton.disabled = true;
			createReloadButton(this.$arenas);
		}

		if (player1.hp === 0 && player1.hp < player2.hp) {
			this.$arenas.appendChild(playerWins(player2.name));
			generateLogs(this.$chat, 'end', player2, player1);
		} else if (player2.hp === 0 && player2.hp < player1.hp) {
			this.$arenas.appendChild(playerWins(player1.name));
			generateLogs(this.$chat, 'end', player1, player2);
		} else if (player1.hp === 0 && player2.hp === 0) {
			this.$arenas.appendChild(playerWins());
			generateLogs(this.$chat, 'draw');
		}
	};
}

export default Game;