import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  authFailure,
  authStart,
  authSuccess,
  clearAuthError,
  selectAuthError,
  selectAuthRole,
  selectAuthStatus,
  selectCurrentUser,
} from "../../store/authSlice.js";
import "./loginSignup.scss";

const STORAGE_KEY = "luxe-auth-account";

const createDefaultValues = () => ({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "user",
});

const sanitizeEmail = (email) => email.trim().toLowerCase();

const loadStoredAccount = () => {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    return null;
  }
};

const persistAccount = (account) => {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(account));
};

const generateUserId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `uid_${Date.now()}`;
};

const LoginSignup = () => {
  const [mode, setMode] = useState("login");
  const dispatch = useDispatch();
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);
  const currentUser = useSelector(selectCurrentUser);
  const currentRole = useSelector(selectAuthRole);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: createDefaultValues(),
  });

  const password = watch("password");
  const isRegister = mode === "register";
  const isLoading = status === "loading";

  const handleModeChange = (nextMode) => {
    if (mode === nextMode) {
      return;
    }
    setMode(nextMode);
    reset(createDefaultValues());
    dispatch(clearAuthError());
  };

  const onSubmit = (formData) => {
    dispatch(authStart());
    const email = sanitizeEmail(formData.email);

    if (isRegister) {
      const newAccount = {
        id: generateUserId(),
        name: formData.fullName.trim(),
        email,
        password: formData.password,
        role: formData.role,
        createdAt: Date.now(),
      };

      try {
        persistAccount(newAccount);
        dispatch(
          authSuccess({
            user: {
              id: newAccount.id,
              name: newAccount.name,
              email: newAccount.email,
            },
            role: newAccount.role,
          })
        );
        reset({ ...createDefaultValues(), role: formData.role });
      } catch (persistError) {
        dispatch(authFailure("Unable to save your account. Please retry."));
      }
      return;
    }

    const storedAccount = loadStoredAccount();
    if (!storedAccount) {
      dispatch(authFailure("Account not found. Please create one first."));
      return;
    }

    if (
      storedAccount.email !== email ||
      storedAccount.password !== formData.password
    ) {
      dispatch(authFailure("Invalid email or password."));
      return;
    }

    dispatch(
      authSuccess({
        user: {
          id: storedAccount.id,
          name: storedAccount.name,
          email: storedAccount.email,
        },
        role: storedAccount.role,
      })
    );
    reset(createDefaultValues());
  };

  const helperText = useMemo(() => {
    if (currentUser && status === "succeeded") {
      const roleLabel = currentRole ?? "user";
      return `Signed in as ${
        currentUser.name || currentUser.email
      } (${roleLabel}).`;
    }
    if (isRegister) {
      return "Already have an account? Sign in to continue.";
    }
    return "New here? Create an account to start shopping.";
  }, [currentRole, currentUser, isRegister, status]);

  return (
    <section className="login-signup-page">
      <div className="auth-card">
        <header className="auth-card__header">
          <div className="auth-card__brand">Luxe</div>
          <div
            className="auth-toggle"
            role="tablist"
            aria-label="Authentication tabs"
          >
            <button
              type="button"
              className={`auth-toggle__button ${
                !isRegister ? "is-active" : ""
              }`}
              onClick={() => handleModeChange("login")}
              role="tab"
              aria-selected={!isRegister}
            >
              Sign In
            </button>

            <button
              type="button"
              className={`auth-toggle__button ${isRegister ? "is-active" : ""}`}
              onClick={() => handleModeChange("register")}
              role="tab"
              aria-selected={isRegister}
            >
              Create Account
            </button>
            
          </div>
          <p className="auth-card__helper">{helperText}</p>
        </header>

        <form
          className="auth-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {isRegister && (
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="fullName">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                className="auth-form__input"
                placeholder="Jane Doe"
                autoComplete="name"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: { value: 2, message: "Name is too short" },
                })}
              />
              {errors.fullName && (
                <p className="auth-form__error">{errors.fullName.message}</p>
              )}
            </div>
          )}

          <div className="auth-form__group">
            <label className="auth-form__label" htmlFor="email">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="auth-form__input"
              placeholder="name@example.com"
              autoComplete={isRegister ? "email" : "username"}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="auth-form__error">{errors.email.message}</p>
            )}
          </div>

          <div className="auth-form__group">
            <label className="auth-form__label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="auth-form__input"
              placeholder="Enter password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Use at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="auth-form__error">{errors.password.message}</p>
            )}
          </div>

          {isRegister && (
            <div className="auth-form__group">
              <label className="auth-form__label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="auth-form__input"
                placeholder="Re-enter password"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <p className="auth-form__error">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          )}

          {isRegister && (
            <div className="auth-form__group">
              <span className="auth-form__label">Account type</span>
              <div className="auth-role-options" role="radiogroup">
                <label className="auth-role-option">
                  <input
                    type="radio"
                    value="user"
                    {...register("role", { required: "Choose a role" })}
                  />
                  <span className="auth-role-option__content">
                    <span className="auth-role-option__title">Customer</span>
                    <span className="auth-role-option__subtitle">
                      Shop and track personal orders
                    </span>
                  </span>
                </label>
                <label className="auth-role-option">
                  <input
                    type="radio"
                    value="seller"
                    {...register("role", { required: "Choose a role" })}
                  />
                  <span className="auth-role-option__content">
                    <span className="auth-role-option__title">Seller</span>
                    <span className="auth-role-option__subtitle">
                      Manage your storefront and inventory
                    </span>
                  </span>
                </label>
              </div>
              {errors.role && (
                <p className="auth-form__error">{errors.role.message}</p>
              )}
            </div>
          )}

          {error && <div className="auth-form__alert">{error}</div>}

          <button
            type="submit"
            className="auth-form__submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Please wait..."
              : isRegister
              ? "Create account"
              : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginSignup;
