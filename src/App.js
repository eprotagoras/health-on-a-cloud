import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { OTSession, OTStreams, preloadScript } from 'opentok-react';
import ConnectionStatus from './components/ConnectionStatus';
import Publisher from './components/Publisher';
import Subscriber from './components/Subscriber';
import SubscriberForm from './components/SubscriberForm';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      connected: false
    };

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

  render() {
    return (
      <OTSession
        apiKey={this.props.apiKey}
        sessionId={this.props.sessionId}
        token={this.props.token}
        eventHandlers={this.sessionEvents}
        onError={this.onError}
        >

        {this.state.error ? <div id="error">{this.state.error}</div> : null}

        <ConnectionStatus connected={this.state.connected} />

        <SubscriberForm 
          name="Form"
        />

        <Publisher />

        <OTStreams>
          <Subscriber />
        </OTStreams>

      </OTSession>  
    );
  }
}

export default preloadScript(App);
