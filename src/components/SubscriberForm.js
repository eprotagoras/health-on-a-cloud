import React from 'react';

class SubscriberForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            api_key: '',
            session_id: '',
            token: ''
        };

        this.setAPIKey = this.setAPIKey.bind(this);
        this.setSessionId = this.setSessionId.bind(this);
        this.setToken = this.setToken.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input type="text" value={this.state.api_key} onChange={this.setAPIKey} />
                <input type="text" value={this.state.session_id} onChange={this.setSessionId} />
                <input type="text" value={this.state.token} onChange={this.setToken} />
                <input type="submit" value="submit" />
            </form>
        );
    }
}

export default SubscriberForm;