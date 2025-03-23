import React from "react";

import "./Auth.css";
import { Link } from "react-router";

const Login = () => {
  return (
    <main className="page-auth">
      <section className="auth-section__container">
        <header className="auth-header">
          <h1>Login</h1>
        </header>

        <form className="auth-form">
          <input type="text" placeholder="Email Address" />
          <input type="text" placeholder="Password" />
          <button>Login</button>
        </form>

        <footer className="auth-footer">
          Don't have an account? <Link>Signup</Link>
        </footer>
      </section>
    </main>
  );
};

export default Login;
