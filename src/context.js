import React, {
	Component
} from "react";
import axios from "axios";

const Context = React.createContext();

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_TRACKS":
			return {
				...state,
				track_list: action.payload,
				heading: "Search Results"
			};
		case "TOGGLE_LOADING":
			return {
				...state,
				loading: false
			}
		default:
			return state;
	}
};

export class Provider extends Component {
	state = {
		track_list: [],
		heading: "Top 10 Tracks",
		loading: true,
		dispatch: action => this.setState(state => reducer(state, action))
	};

	// async componentDidMount() {
	//   const res = await axios.get("https://jsonplaceholder.typicode.com/users");
	//
	//   this.setState({
	//     placeHolder: res.data
	//   });
	// }

	componentDidMount() {
		console.log(this.state.track_list)
		axios
			.get(
				`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${
          process.env.API_KEY
        }`
			)
			.then(res => {
				// console.log(res.data);
				this.setState({
					track_list: res.data.message.body.track_list,
					loading: false
				}, () => console.log(this.state.track_list));
			})
			.catch(err => console.log(err));
	}

	render() {
		return (
			<Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
		);
	}
}

export const Consumer = Context.Consumer;
