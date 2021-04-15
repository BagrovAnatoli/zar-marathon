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
	return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
	this.elHP().style.width = this.hp + '%';
}

function playerLose(name) {
	const $loseTitle = createElement('div', 'loseTitle');
	$loseTitle.innerText = name + ' lose';

	return $loseTitle;
}

function playerWins(name) {
	const $winTitle = createElement('div', 'loseTitle');
	if (name) {
		$winTitle.innerText = name + ' win';
	} else {
		$winTitle.innerText = 'draw';
	}
	

	return $winTitle;
}

function getRandom(num) {
	return Math.ceil(Math.random() * num);
}

$randomButton.addEventListener('click', function() {
	console.log('####: Click Random Button');
	player1.changeHP(getRandom(20));
	player2.changeHP(getRandom(20));
	player1.renderHP();
	player2.renderHP();

	if (player1.hp === 0 || player2.hp === 0) {
		$randomButton.disabled = true;
		createReloadButton();
	}

	if (player1.hp === 0 && player1.hp < player2.hp) {
		$arenas.appendChild(playerWins(player2.name));
	} else if (player2.hp === 0 && player2.hp < player1.hp) {
		$arenas.appendChild(playerWins(player1.name));
	} else if (player1.hp === 0 && player2.hp === 0) {
		$arenas.appendChild(playerWins());
	}
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));