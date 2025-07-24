import React from 'react';
import MessageBubble from './MessageBubble';
import { roleEnum } from '../DTO/role-dto';

const IA_RESPONSES = [
  { keywords: ['hola', 'buenas'], response: name => `Hola, ${name}` },
  { keywords: ['necesito ayuda'], response: () => 'En un momento lo estaremos asistiendo.' },
  { keywords: ['gracias'], response: () => 'Estamos aquí para ayudarte.' },
];

function getIAResponse(message, name) {
  const lowerMsg = message.toLowerCase();
  for (const rule of IA_RESPONSES) {
    if (rule?.keywords?.some(k => lowerMsg?.includes(k))) {
      return rule?.response(name);
    }
  }
  return `Gracias por tu mensaje, ${name}.`;
}

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      input: '',
    };
  }

  handleInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  handleSend = () => {
    const { input, messages } = this.state;
    const { name, role } = this.props;
    if (!input?.trim()) return;
    const newMessages = [...messages, { text: input, role }];
    this.setState({ messages: newMessages, input: '' });

    if (role?.includes(roleEnum?.USER)) {
      setTimeout(() => {
        const iaMsg = getIAResponse(input, name);
        this.setState({
          messages: [...this.state.messages, { text: iaMsg, role: roleEnum?.IA }],
        });
      }, 500);
    }
  };

 render() {
  const { name, role } = this.props;
  const { messages, input } = this.state;
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center'
    }}>
      <h1>¡Bienvenido, {name}! Tu rol es: {role}</h1>
      <div style={{ width: '100%', maxWidth: 600 }}>
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} text={msg.text} role={msg.role} />
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <input
          value={input}
          onChange={this.handleInputChange}
          disabled={role === 'IA'}
          style={{ padding: '0.5rem', width: '300px' }}
        />
        <button
          onClick={this.handleSend}
          disabled={role === 'IA'}
          style={{ marginLeft: '0.5rem', padding: '0.5rem 1rem' }}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

}