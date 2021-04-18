const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.button');
const $formButton = document.querySelector('.button');
const $formFight = document.querySelector('.control');
const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];
const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};

const player1 = {
	player: 1,
	name: 'KITANA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['шашка', 'нож', 'лук'],
	attack: function(){
		console.log(this.name + ' Fight...');
	},
	changeHP,
	elHP,
	renderHP,
};

const player2 = {
	player: 2,
	name: 'SUB-ZERO',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['булава', 'меч', 'щит'],
	attack: function(){
		console.log(this.name + ' Fight...');
	},
	changeHP,
	elHP,
	renderHP,
};

function createElement(tag, className) {
	const $tag = document.createElement(tag);

	if (className) {
		$tag.classList.add(className);	
	}
	
	return $tag;
}

function createPlayer(player) {
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
	const $reloadButtonDiv = createElement('div', 'reloadWrap');
	const $reloadButton = createElement('button', 'button');
	$reloadButton.innerText = 'Reload';

	$reloadButton.addEventListener('click', function() {
		window.location.reload();
	});

	$reloadButtonDiv.appendChild($reloadButton);
	$arenas.appendChild($reloadButtonDiv);
}

function changeHP(deltaHP) {
	this.hp = this.hp > deltaHP ? this.hp - deltaHP : 0;	
}

function elHP() {
	return document.querySelector(`.player${this.player}  .life`);
}

function renderHP() {
	this.elHP().style.width = `${this.hp}%`;
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

function getRandom(num) {
	return Math.ceil(Math.random() * num);
}



// $randomButton.addEventListener('click', function() {
// 	console.log('####: Click Random Button');
// 	player1.changeHP(getRandom(20));
// 	player2.changeHP(getRandom(20));
// 	player1.renderHP();
// 	player2.renderHP();

// 	if (player1.hp === 0 || player2.hp === 0) {
// 		$randomButton.disabled = true;
// 		createReloadButton();
// 	}

// 	if (player1.hp === 0 && player1.hp < player2.hp) {
// 		$arenas.appendChild(playerWins(player2.name));
// 	} else if (player2.hp === 0 && player2.hp < player1.hp) {
// 		$arenas.appendChild(playerWins(player1.name));
// 	} else if (player1.hp === 0 && player2.hp === 0) {
// 		$arenas.appendChild(playerWins());
// 	}
// });


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player1, player2);


function getTime() {
	const date = new Date();
	return `${date.getHours()}:${date.getMinutes()}`;
}

function enemyAttack() {
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

function playerAttack () {
	const attack = {}

	for (let item of $formFight) {
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

function showResult() {
	if (player1.hp === 0 || player2.hp === 0) {
		$formButton.disabled = true;
		createReloadButton();
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
		generateLogs('end', player2, player1);
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
		generateLogs('end', player1, player2);
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins());
		generateLogs('draw');
	}
}

function generateLogs(type, player1, player2) {
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
			text = logs[type];
			break;
		default:
			text = 'Что-то новенькое!';

	}
	addLog(text);

}

function getLogStringId(type) { // возвращает случайный индекс строки соотетсвующего типа из logs
	return getRandom(logs[type].length) - 1;
}

function timeAndReplace(text, player1, player2) { // возвращает строку в формате время и текст с заменой [playerKick] и [playerDefence] на имена
	let newText = `${getTime()} - `;
	newText += text.replace('[playerKick]', player1.name).replace('[playerDefence]', player2.name);
	return newText;
}

function addLog(text) { // выводит текст ввиде лога на экран
	console.log(text);
	const el = `<p>${text}</p>`;
	$chat.insertAdjacentHTML('afterbegin', el);
}

$formFight.addEventListener('submit', function(event) {
	event.preventDefault();
	const enemy = enemyAttack();

	const player = playerAttack();
	console.log('####: a', player);
	console.log('####: e', enemy);

	if (player.defence !== enemy.hit) {
		player1.changeHP(enemy.value);
		player1.renderHP();
		console.log('неудачная защита');
		generateLogs.call(enemy, 'hit', player2, player1);
	} else {
		console.log('удачная защита');
		generateLogs('defence', player2, player1);
	}
	if (enemy.defence !== player.hit) {
		player2.changeHP(player.value);
		player2.renderHP();
		console.log('успешная атака');
		generateLogs.call(player,'hit', player1, player2);
	} else {
		console.log('неудачная атака');
		generateLogs('defence', player1, player2);
	}
	
	showResult();



});