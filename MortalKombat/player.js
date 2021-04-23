import { changeHP, elHP, renderHP } from './utils.js';
class Player {
	constructor(props) {
		console.log('Player');
		console.log(props);
		this.player = props.player;
		this.name = props.name;
		this.hp = props.hp;
		this.img = props.img;
	}

	changeHP = changeHP;
	elHP = elHP;
	renderHP = renderHP;

	attack =() => {
		console.log(this.name + ' Fight...');
	}
}
export const player1 = new Player({
	player: 1,
	name: 'KITANA',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
});

export const player2 = new Player({
	player: 2,
	name: 'SUB-ZERO',
	hp: 100,
	img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
});

