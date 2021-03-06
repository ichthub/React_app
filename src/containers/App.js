import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Auxi from '../HOC/Auxi';
import withClass from '../HOC/withClass_2';


class App extends PureComponent {
	constructor (props) {
		super(props);
		console.log('[App.js] inside constructor()',props);
		this.state = {
			persons: [
				{ id: 'asfa1', name: 'Max', age: 28 },
				{ id: 'vasdf1', name: 'Manu', age: 29 },
				{ id: 'asdf11', name: 'Stephanie', age: 26 }
			],
			toggleClicked: 0,
			showPersons: false
  };

}
	/*--------------------------------lifecycle explained---------------------*/
	componentWillMount () {
		console.log('[App.js] inside ComponentWillMount()');
	}
	
	componentDidMount () {
		console.log('[App.js] inside ComponentDidMount()');
	}
	
	//this is done by imorting PureComponent
	/*shouldComponentUpdate ( nextProps, nextState ){
		console.log("[UPDATE App.js] Inside shouldComponentUpdate", nextProps, nextState);
		return nextState.persons !== this.state.persons ||  nextState.showPersons !== this.state.showPersons;
	}*/
	
	componentWillUpdate ( nextProps, nextState ){
		console.log("[UPDATE App.js] Inside componentWillUpdate", nextProps, nextState);
	}
	
	componentDidUpdate (){
		console.log("[UPDATE App.js] Inside componentDidUpdate");
	}
	/*------------------------------------------------------------------------*/
	

	nameChangedHandler = ( event, id ) => {
		const personIndex = this.state.persons.findIndex(p => {
		return p.id === id;
	});

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState( {persons: persons} );
	}

	deletePersonHandler = (personIndex) => {
		// const persons = this.state.persons.slice();
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		this.setState({persons: persons});
	}

	togglePersonsHandler = () => {
		const doesShow = this.state.showPersons;
		
		this.setState( (prevState, props) =>{
			return{
				showPersons: !doesShow,
				toggleClicked: prevState.toggleClicked +1
			}
		} );
	}

	render () {
		console.log('[App.js] inside render ()');
		let persons = null;
		
		if ( this.state.showPersons ) {
			persons = 
			<Persons
				persons ={this.state.persons}
				clicked ={this.deletePersonHandler} 
				changed ={this.nameChangedHandler}

				/>;

	}

	
    return (
	
      <Auxi>
		<button onClick = {()=>{this.setState({showPersons: true})}}>Show Button</button>
		<Cockpit
			appTitle = {this.props.title}
			showPersons={this.state.showPersons}
			persons = {this.state.persons}
			clicked = {this.togglePersonsHandler}
		/>
        {persons}
      </Auxi>
	);
	}
}

export default withClass(App, classes.App );
