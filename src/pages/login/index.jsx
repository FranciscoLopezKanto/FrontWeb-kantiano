import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Components from './Login';

function Login() {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error('Por favor, ingresa tu correo electrónico y contraseña.', { autoClose: 3000 });
      return;
    }

    try {
      const response = await axios.post(process.env.REACT_APP_LOGIN_URL, {
        email,
        password,
        userType: signIn ? 'profesional' : 'secretaria',
      });
      const { token,userType } = response.data;
      toast.success('Inicio de sesión exitoso',{ autoClose: 1000 });
      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error('Error de inicio de sesión. Por favor, revisa tus credenciales.',{ autoClose: 1200 });
      
      } else {
        toast.error('Error de inicio de sesión. Por favor, revisa tus credenciales.',{ autoClose: 1200 });
      }
    }
  };

  const handleToggle = () => {
    setSignIn(prevSignIn => !prevSignIn);
  };

  return (
    <Components.Container>
      <ToastContainer />
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Login</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleLogin}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form>
          <Components.Title>Login</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Anchor href="#">Forgot your password?</Components.Anchor>
          <Components.Button onClick={handleLogin}>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Hello Secretary!</Components.Title>
            <Components.Paragraph>Manage everything about the medical center</Components.Paragraph>
            <Components.GhostButton onClick={handleToggle}>I am a doctor</Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello, Doctor!</Components.Title>
            <Components.Paragraph>Manage your patients and medical center reservations</Components.Paragraph>
            <Components.GhostButton onClick={handleToggle}>I am a secretary</Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default Login;
