import React from 'react';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './ConnectionStatus';
import Subscriber from './Subscriber';
import '../App.css';

class SubscriberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            connected: false,
            api_key: '',
            session_id: '',
            token: ''
        };

        this.setAPIKey = this.setAPIKey.bind(this);
        this.setSessionId = this.setSessionId.bind(this);
        this.setToken = this.setToken.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.sessionEvents = {

            sessionConnected: () => {
                this.setState({
                    connected: true
                });
            },
            sessionDisconnected: () => {
                this.setState({
                    connected: false
                });
            }
      
         };
    }

    onError = (err) => {
        this.setState({
            error: `Failed to connect: ${err.message}`
        });
    }

    setAPIKey = (event) => {
        this.setState({ api_key: event.target.value });
    }

    setSessionId = (event) => {
        this.setState({ session_id: event.target.value });
    }

    setToken = (event) => {
        this.setState({ token: event.target.value });
    }

    handleSubmit = (event) => {
        alert(this.state.api_key + ' ' + this.state.session_id + ' ' + this.state.token);
        console.log("Submitting keys!");
        this.setState({ connected: true })
        
        // this.render();
        event.preventDefault();
    }

    render() {
        return (
            <view className="subscriber-form">
                <view className="subscriber-form-title">
                    <label>tokbox-react-demo</label>
                </view>
                <form onSubmit={this.handleSubmit}>
                    <view className="subscriber-form-field">
                        <label>API Key</label>
                        <br />
                        <input type="text" value={this.state.api_key} onChange={this.setAPIKey} placeholder="api_key" />
                    </view>
                    <view className="subscriber-form-field">
                        <label>SessionID</label>
                        <br />
                        <input type="text" value={this.state.session_id} onChange={this.setSessionId} placeholder="session_id" />
                    </view>
                    <view className="subscriber-form-field">
                        <label>Token</label>
                        <br />
                        <input type="text" value={this.state.token} onChange={this.setToken} placeholder="token" />
                    </view>
                    <view className="subscriber-form-submit">
                        <input type="submit" value="submit" />
                    </view>
                 </form>

                {this.state.connected && this.state.api_key && this.state.session_id && this.state.token? 
                    <OTSession
                        apiKey={this.state.api_key}
                        sessionId={this.state.session_id}
                        token={this.state.token}
                        eventHandlers={this.sessionEvents}
                        onError={this.onError}
                        >
            
                        {this.state.error ? <div id="error">{this.state.error}</div> : null}
            
                        <ConnectionStatus connected={this.state.connected} />        
            
                        <OTStreams>
                            <Subscriber />
                        </OTStreams>

                    </OTSession>  
                    : null}
            </view>
        );
    }
}

export default SubscriberForm;