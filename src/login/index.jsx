import React from 'react';
import { roleEnum } from "../DTO/role-dto";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', role: roleEnum.USER, error: '' };
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value, error: '' });
  };

  handleRoleChange = (e) => {
    this.setState({ role: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, role } = this.state;
    if (!name.trim()) {
      this.setState({ error: 'El nombre es obligatorio.' });
      return;
    }
    this.props.onLogin(name, role);
  };

  render() {
    const { name, role, error } = this.state;
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)'
      }}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            minWidth: '320px',
            padding: '2.5rem',
            background: '#fff',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
          }}
          onSubmit={this.handleSubmit}
        >
          <h2 style={{ textAlign: 'center', margin: 0 }}>Iniciar sesión</h2>
          <input
            value={name}
            onChange={this.handleChange}
            placeholder="Nombre"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
            autoFocus
          />
          <select
            value={role}
            onChange={this.handleRoleChange}
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '1rem'
            }}
          >
            <option value={roleEnum.USER}>{roleEnum.USER}</option>
            <option value={roleEnum.IA}>{roleEnum.IA}</option>
          </select>
          <button
            type="submit"
            style={{
              padding: '0.75rem',
              borderRadius: '8px',
              border: 'none',
              background: '#6366f1',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Iniciar sesión
          </button>
          {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
        </form>
      </div>
    );
  }
}