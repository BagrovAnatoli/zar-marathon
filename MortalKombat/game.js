import Player from './Player/index.js';
import { generateLogs, createReloadButton, playerWins } from './utils/index.js';

const player1 = new Player({
	player: 1,
	name: 'KITANA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	rootSelector: 'arenas',
});

const player2 = new Player({
	player: 2,
	name: 'SUB-ZERO',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	rootSelector: 'arenas',
});

class Game{
	constructor(){
		this.$arenas = document.querySelector('.arenas');
		this.$formButton = document.querySelector('.button');
		this.$formFight = document.querySelector('.control');
		this.$chat = document.querySelector('.chat');

		player1.createPlayer();
		player2.createPlayer();
	}
	start = () => {
		console.log('start');

		generateLogs(this.$chat, 'start', player1, player2);

		this.$formFight.addEventListener('submit', this.fightHandler);
	}

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