import React from 'react';
import Login from './login';
import Chat from './chat/chat';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: localStorage.getItem('name') || '',
      role: localStorage.getItem('role') || '',
    };
  }

  handleLogin = (name, role) => {
    localStorage.setItem('name', name);
    localStorage.setItem('role', role);
    this.setState({ name, role });
  };

render() {
  const { name, role } = this.state;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      {name && role ? (
        <Chat name={name} role={role} />
      ) : (
        <Login onLogin={this.handleLogin} />
      )}
    </div>
  );
}

}