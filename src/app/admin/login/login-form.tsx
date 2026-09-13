"use client";

import { useActionState } from "react";
import { login, type LoginState } from "../actions";
import styles from "../admin.module.css";

export default function LoginForm() {
  const [state, formAction, pending] = useActionState<LoginState, FormData>(
    login,
    undefined,
  );

  return (
    <form action={formAction} className={styles.form}>
      <label htmlFor="token" className={styles.label}>
        Admin token
      </label>
      <input
        id="token"
        name="token"
        type="password"
        required
        autoComplete="current-password"
        className={styles.input}
      />
      {state?.error ? (
        <p role="alert" className={styles.error}>
          {state.error}
        </p>
      ) : null}
      <button type="submit" disabled={pending} className={styles.button}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
