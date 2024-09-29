"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RootLayout from "../../components/layout/RootLayout";
import Image from 'next/image'; 
import imgLogin from './img_login.png'; 
import logo from './logo.png'; // Importe o logo PNG
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = "seu_token"; // Substitua por uma lógica real de autenticação
    localStorage.setItem('token', token);
    router.push('/dashboard');
  };

  return (
    <RootLayout>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.leftSide}>
            <h1 className={styles.title}>Bem-vindo</h1>
            <p className={styles.subtitle}>Entre na sua conta para acessar o sistema</p>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formDiv}>
                <label htmlFor="email" className={styles.label}>Email:</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formDiv}>
                <label htmlFor="senha" className={styles.label}>Senha:</label>
                <input
                  type="password"
                  id="senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.button}>Entrar</button>
              </div>
            </form>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.imageContainer}>
              <Image 
                src={imgLogin} 
                alt="OdontoFlow" 
                className={styles.image} 
                priority // Para melhorar o carregamento
              />
              <div className={styles.titleContainer}>
                <Image src={logo} alt="Logo" className={styles.logo} />
                <h2 className={styles.imageTitle}>OdontoFlow</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
