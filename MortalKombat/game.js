import Player from './Player/index.js';
import { generateLogs, createReloadButton, playerWins, enemyAttack, playerAttack, getRandom } from './utils/index.js';

let player1;
let player2;

class Game{
	constructor(){
		this.$arenas = document.querySelector('.arenas');
		this.$formButton = document.querySelector('.button');
		this.$formFight = document.querySelector('.control');
		this.$chat = document.querySelector('.chat');

	}
	start = async () => {
		console.log('start');
		const players = await this.getPlayers();
		const p1 = players[getRandom(players.length)-1];
		const p2 = players[getRandom(players.length)-1];
		console.log(p1, p2);
		player1 = new Player({
			...p1,
			player: 1,
			rootSelector: 'arenas'
		});
		player2 = new Player({
			...p2,
			player: 2,
			rootSelector: 'arenas'
		});
		player1.createPlayer();
		player2.createPlayer();

		generateLogs(this.$chat, 'start', player1, player2);

		this.$formFight.addEventListener('submit', this.fightHandler);
	}

	getPlayers = async () => {
		const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
		return body;
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