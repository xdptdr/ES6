import React, { Component } from 'react';
import './App.css';

const possibilities = ['blip','blop'];

function* genFunc() {
	let c=0;
    while(true) {
		let a=yield;
		if(a) {
			yield a+c;
		} else {
			yield c;
		}
		++c;
	}
}

const genObj = genFunc();

class Blip extends Component {
	render() {
		return (<div>
			<div>Blip</div>
			<button onClick={this.setState.bind(this)}>Button</button>
			{genObj.next("a").value}
		</div>);
	}
}

class App extends Component {
	state = {
		what:possibilities[0]
	}
	page = {
		blip:() => {
			return <Blip />;
		},
		blop:() => {
			return "Nothing there";
		}
	}
	render() {
		const {what} = this.state;
		const buttons = possibilities.map(
			(what)=>(<button
				key={what}
				onClick={this.setState.bind(this,{what:what})}
			>{what}</button>
		));
		return (
			<div>
				<div>{buttons}</div>
				{this.page[what]()}
			</div>
		);
	}
}

export default App;
