const $arenas = document.querySelector('.arenas');
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

const createPlayer = function(player){
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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));