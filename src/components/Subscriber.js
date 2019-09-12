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
            video: true,
            boxActive: false
        };        
    }

    renderSubscribers = (subscribers) => {
        console.log("Rendering subscribers!");
        return subscribers.map((streamId) => (
            <OTSubscriberView streamId={streamId} />
        ));
    };

    setAudio = (audio) => {
        this.setState({ audio });
    }
    setVideo = (video) => {
        this.setState({ video });
    }
    showBoundingBox = (boxActive) => {
        var canvas = document.getElementById('bounding-box');
        if (canvas && canvas.getContext) {
            var ctx = canvas.getContext('2d');

            if (this.state.boxActive) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            } else {
                ctx.strokeRect(50, 50, 50, 50);
            }
        }

        this.setState({ boxActive });
    }
    onError = (err) => {
        this.setState({ error: `Failed to subscribe: ${err.message}` });
    }

    render() {
        return (
            <div className="subscriber">
                {this.state.error ? <div id="error">{this.state.error}</div> : null}

                <div className="subscriber-box">
                <OTSubscriber
                    properties={{
                        subscribeToAudio: this.state.audio,
                        subscribeToVideo: this.state.video
                    }}
                    onError={this.onError}
                >
                    {this.renderSubscribers}
                </OTSubscriber>
                </div>
                
                <div className="bounding-box">
                    <canvas id="bounding-box"></canvas>
                </div>

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
                <CheckBox 
                    label="Show Bounding Box"
                    initialChecked={this.state.boxActive}
                    onChange={this.showBoundingBox}
                />

                
            </div>
            
            
        );
    }
}
export default Subscriber;