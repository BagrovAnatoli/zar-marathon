const player1 = {
	name: 'KITANA',
	hp: 80,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
	weapon: ['шашка', 'нож', 'лук'],
	attack: function(){
		console.log(this.name + ' Fight...');
	}
};

const player2 = {
	name: 'SUB-ZERO',
	hp: 40,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
	weapon: ['булава', 'меч', 'щит'],
	attack: function(){
		console.log(this.name + ' Fight...');
	}
};

const createPlayer = function(playerClass, player){
	$player = document.createElement('div');
	$player.classList.add(playerClass);

	$progressbar = document.createElement('div');
	$progressbar.classList.add('progressbar');

		$life = document.createElement('div');
		$life.classList.add('life');
		$life.style.width = player.hp + '%';

		$name = document.createElement('div');
		$name.classList.add('name');
		$name.innerText = player.name;

		$progressbar.appendChild($life);
		$progressbar.appendChild($name);

	$character = document.createElement('div');
	$character.classList.add('character');

		$img = document.createElement('img');
		$img.src = player.img;

		$character.appendChild($img);
	
	$player.appendChild($progressbar);
	$player.appendChild($character);

	document.querySelector('.arenas').appendChild($player);
};

createPlayer('player1', player1);
createPlayer('player2', player2);