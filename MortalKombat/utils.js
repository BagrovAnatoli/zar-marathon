import { HIT, ATTACK, logs } from './data.js';

export function getRandom(num) {
	return Math.ceil(Math.random() * num);
}

export function changeHP(deltaHP) {
	this.hp = this.hp > deltaHP ? this.hp - deltaHP : 0;	
}

export function elHP() {
	return document.querySelector(`.player${this.player}  .life`);
}

export function renderHP() {
	this.elHP().style.width = `${this.hp}%`;
}

function createElement(tag, className) {
	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);	
	}
	
	return $tag;
}

export function createPlayer(player) {
	const $player = createElement('div', 'player' + player.player);
	const $progressbar = createElement('div', 'progressbar');
	const $character = createElement('div', 'character');
	const $life = createElement('div', 'life');
	const $name = createElement('div', 'name');
	const $img = createElement('img');

	$life.style.width = player.hp + '%';
	$name.innerText = player.name;
	$img.src = player.img;

	$progressbar.appendChild($life);
	$progressbar.appendChild($name);


	$character.appendChild($img);

	$player.appendChild($progressbar);
	$player.appendChild($character);

	return $player;
};

function createReloadButton() {
	const {$arenas} = this;
	const $reloadButtonDiv = createElement('div', 'reloadWrap');
	const $reloadButton = createElement('button', 'button');
	$reloadButton.innerText = 'Reload';

	$reloadButton.addEventListener('click', function() {
		window.location.reload();
	});

	$reloadButtonDiv.appendChild($reloadButton);
	$arenas.appendChild($reloadButtonDiv);
}

function playerLose(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = `${name} lose`;

	return $loseTitle;
}

function playerWins(name) {
	const $winTitle = createElement('div', 'loseTitle');
	if (name) {
		$winTitle.innerText = `${name} win`;
	} else {
		$winTitle.innerText = 'draw';
	}
	

	return $winTitle;
}

function getTime() {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}`;
}

export function enemyAttack() {
	const hit = getRandomTarget();
	const defence = getRandomTarget();
	const value = getValue(hit);
	return {
		value,
		hit,
		defence,
	}
}

function getRandomTarget() {
	return ATTACK[getRandom(3) - 1];
}

function getValue(target) {
	return getRandom(HIT[target]);
}

export function playerAttack () {
	const attack = {}

	for (let item of this) {
		if (item.checked && item.name === 'hit') {
			attack.value = getValue(item.value);
			attack.hit = item.value;
		} else if (item.checked && item.name === 'defence') {
			attack.defence = item.value;
		}

		item.checked = false;
	}

	return attack;
}

export function showResult() {
	console.log('showResult this', this);
	const { player1, player2, $formButton, $arenas, $chat } = this;
	if (player1.hp === 0 || player2.hp === 0) {
		$formButton.disabled = true;
		createReloadButton.call({$arenas});
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
		generateLogs($chat, 'end', player2, player1);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
		generateLogs($chat, 'end', player1, player2);
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins());
		generateLogs($chat, 'draw');
	}
}

export function generateLogs(chat, type, player1, player2) {
	const stringId = getLogStringId(type);
	let text;
	switch (type) {
		case 'start':
			text = logs.start.replace('[time]', getTime()).replace('[player1]', player1.name).replace('[player2]', player2.name);
			break;
		case 'end':
			text = logs[type][stringId].replace('[playerWins]', player1.name).replace('[playerLose]', player2.name);
			break;
		case 'hit':
			text = timeAndReplace(logs[type][stringId], player1, player2);
			text += ` -${this.value} [${player2.hp}/100]`;
			break;
		case 'defence':
			text = timeAndReplace(logs[type][stringId], player1, player2);
			break;
		case 'draw':
			text = logs.draw;
			break;
		default:
			text = 'Что-то новенькое!';

	}
	addLog(chat, text);

}

function getLogStringId(type) { // возвращает случайный индекс строки соотетсвующего типа из logs
	return getRandom(logs[type].length) - 1;
}

function timeAndReplace(text, player1, player2) { // возвращает строку в формате время и текст с заменой [playerKick] и [playerDefence] на имена
	let newText = `${getTime()} - `;
	newText += text.replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
	return newText;
}

function addLog(chat, text) { // выводит текст ввиде лога на экран
	console.log(text);
	const el = `<p>${text}</p>`;
	chat.insertAdjacentHTML('afterbegin', el);
}

export default getRandom;