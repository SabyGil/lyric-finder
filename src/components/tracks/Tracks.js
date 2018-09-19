import React, {
	Component
} from "react";
import {
	Consumer
} from "../../context";
import Spinner from "../layout/Spinner";
import Track from "./Track";

class Tracks extends Component {
	render() {
		return (
			<Consumer>
        {value => {
          // console.log(value);
          const { track_list, heading, loading } = value;
          if (loading) {
            // console.log(track_list)
            return <Spinner />;
          } else {
            return (
              <React.Fragment>
                {		console.log(track_list)}
                <h3 className="text-center mb-4">{heading}</h3>
                <div className="row">
                  {track_list.map(item => (
                    <Track key={item.track.track_id} track={item.track} />
                  ))}
                </div>
              </React.Fragment>
            );
          }
        }}
      </Consumer>
		);
	}
}

export default Tracks;
