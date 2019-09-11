import React from 'react';
import { OTSubscriber, OTSubscriberView } from 'opentok-react';
import CheckBox from './CheckBox';
import '../App.css';

class Subscriber extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            audio: true,
            video: true
        };        
    }

    renderSubscribers = (subscribers) => {
        return subscribers.map((streamId) => (
            <OTSubscriberView streamId={streamId}>
                <canvas id="bounding-box"></canvas>
            </OTSubscriberView>
        ));
    };

    setAudio = (audio) => {
        this.setState({ audio });
    }
    setVideo = (video) => {
        this.setState({ video });

        var canvas = document.getElementById('canvas');
        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');

            ctx.fillRect(25, 25, 100, 100);
            ctx.clearRect(45, 45, 60, 60);
            ctx.strokeRect(50, 50, 50, 50);
        }
    }
    onError = (err) => {
        this.setState({ error: `Failed to subscribe: ${err.message}` });
    }

    render() {
        return (
            <div className="subscriber">
                Subscriber
                
                {this.state.error ? <div id="error">{this.state.error}</div> : null}

                <OTSubscriber 
                    properties={{
                        subscribeToAudio: this.state.audio,
                        subscribeToVideo: this.state.video
                    }}
                    onError={this.onError}
                >
                    {this.renderSubscribers}
                </OTSubscriber>

                <CheckBox
                    label="Subscribe to Audio"
                    initialChecked={this.state.audio}
                    onChange={this.setAudio}
                />
                <CheckBox
                    label="Subscribe to Video"
                    initialChecked={this.state.video}
                    onChange={this.setVideo}
                />
            </div>
        );
    }
}
export default Subscriber;