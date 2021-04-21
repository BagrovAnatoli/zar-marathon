import { player1, player2 } from './player.js';
import { HIT, ATTACK, logs } from './data.js';
import getRandom from './utils.js';
import { changeHP, elHP, renderHP } from './utils.js';
import { createPlayer, generateLogs, showResult } from './utils.js';
import { enemyAttack, playerAttack } from './utils.js';

const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $formButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');




$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs($chat, 'start', player1, player2);




$formFight.addEventListener('submit', function(event) {
	event.preventDefault();
	const enemy = enemyAttack();

	const player = playerAttack.call($formFight);
	console.log('####: a', player);
	console.log('####: e', enemy);

	if (player.defence !== enemy.hit) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		console.log('неудачная защита');
		generateLogs.call(enemy, $chat,  'hit', player2, player1);
	} else {
		console.log('удачная защита');
		generateLogs($chat, 'defence', player2, player1);
	}
	if (enemy.defence !== player.hit) {
		player2.changeHP(player.value);
		player2.renderHP();
		console.log('успешная атака');
		generateLogs.call(player, $chat, 'hit', player1, player2);
	} else {
		console.log('неудачная атака');
		generateLogs($chat, 'defence', player1, player2);
	}
	
	showResult.call({player1, player2, $formButton, $arenas, $chat});



});