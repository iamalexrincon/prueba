import React from 'react';
import { roleEnum } from '../DTO/role-dto';

export default class MessageBubble extends React.Component {
  render() {
    const { text, role } = this.props;
    const style = {
      background: role?.includes(roleEnum?.IA) ? '#e0e0e0' : '#aee1f9',
      color: '#333',
      borderRadius: '12px',
      padding: '8px 16px',
      margin: '8px',
      textAlign: role?.includes(roleEnum?.IA) ? 'left' : 'right',
      maxWidth: '60%',
      alignSelf: role?.includes(roleEnum?.IA) ? 'flex-start' : 'flex-end',
    };
    return <div style={style}>{text}</div>;
  }
}