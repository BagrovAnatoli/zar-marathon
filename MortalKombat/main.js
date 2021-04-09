const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');
const player1 = {
	player: 1,
	name: 'KITANA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['шашка', 'нож', 'лук'],
	attack: function(){
		console.log(this.name + ' Fight...');
	}
};

const player2 = {
	player: 2,
	name: 'SUB-ZERO',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['булава', 'меч', 'щит'],
	attack: function(){
		console.log(this.name + ' Fight...');
	}
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

function changeHP(player) {
	const $playerLife = document.querySelector('.player' + player.player + ' .life');
	player.hp -= Math.ceil(Math.random() * 20); // от 1 до 20

	if (player.hp < 0) { // поставил это условие перед отображением жизни
		player.hp = 0;
		$arenas.appendChild(playerLose(player.name));
	}

	// const width = (player.hp < 0 ? 0 : player.hp) + '%';
	const width = player.hp + '%';
	console.log('width:', width, 'hp:', player.hp);

	$playerLife.style.width = player.hp + '%';
	

	
}

function playerLose(name) { // когда проигрывают оба, то сообщения показываются друг на друге
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' lose';

	return $loseTitle;
}

$randomButton.addEventListener('click', function() {
	console.log('####: Click Random Button');
	changeHP(player1);
	changeHP(player2);
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));