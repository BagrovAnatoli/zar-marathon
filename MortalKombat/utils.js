import { HIT, ATTACK, logs } from './data.js';


export function changeHP(deltaHP) {
	this.hp = this.hp > deltaHP ? this.hp - deltaHP : 0;	
}

export function elHP() {
	return document.querySelector(`.player${this.player}  .life`);
}

export function renderHP() {
	this.elHP().style.width = `${this.hp}%`;
}

export const createElement = (tag, className) => {
	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);	
	}
	
	return $tag;
}

export function createReloadButton($arenas) {
	const $reloadButtonDiv = createElement('div', 'reloadWrap');
	const $reloadButton = createElement('button', 'button');
	$reloadButton.innerText = 'Reload';

	$reloadButton.addEventListener('click', function() {
		window.location.reload();
	});

	$reloadButtonDiv.appendChild($reloadButton);
	$arenas.appendChild($reloadButtonDiv);
}

export const playerWins = (name) => {
	const $winTitle = createElement('div', 'loseTitle');
	if (name) {
		$winTitle.innerText = `${name} win`;
	} else {
		$winTitle.innerText = 'draw';
	}
	

	return $winTitle;
}

export const enemyAttack = () => {
	const hit = getRandomTarget();
	const defence = getRandomTarget();
	const value = getValue(hit);
	return {
		value,
		hit,
		defence,
	}
}

export function playerAttack (form) {
	const attack = {}

	for (let item of form) {
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

const getRandom = (num) => Math.ceil(Math.random() * num);

const getRandomTarget = () => ATTACK[getRandom(3) - 1];

const getValue = (target) => getRandom(HIT[target]);

const getTime = () => {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}`;
}

export function generateLogs(chat, type, player1, player2, value) {
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
			text += ` -${value} [${player2.hp}/100]`;
			break;
		case 'defence':
			text = timeAndReplace(logs[type][stringId], player1, player2);
			break;
		case 'draw':
			text = logs.draw;
			break;
		default:
			text = 'Что-то новенькое!';
			break;
	}
	addLog(chat, text);

}

const getLogStringId = (type) => getRandom(logs[type].length) - 1; // возвращает случайный индекс строки соотетсвующего типа из logs

const timeAndReplace = (text, player1, player2) => { // возвращает строку в формате время и текст с заменой [playerKick] и [playerDefence] на имена
	let newText = `${getTime()} - `;
	newText += text.replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
	return newText;
}

const addLog = (chat, text) => { // выводит текст ввиде лога на экран
	console.log(text);
	const el = `<p>${text}</p>`;
	chat.insertAdjacentHTML('afterbegin', el);
}

export default generateLogs;