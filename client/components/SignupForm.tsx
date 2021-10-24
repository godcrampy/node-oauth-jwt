import React, { useState } from "react";
import { Button, KIND } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Heading, HeadingLevel } from "baseui/heading";
import { useStyletron } from "baseui";
import { validateEmail } from "../util/string.util";
import MockAuthRepository from "../repository/auth/MockAuthRepository";
import AuthRepository from "../repository/auth/AuthRepository";
import { Notification, KIND as NKIND } from "baseui/notification";
import { SnackbarElement } from "baseui/snackbar";

const EmailSignupForm = () => {
  const authRepository: AuthRepository = new MockAuthRepository();

  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale300 });
  const right = css({ textAlign: "end" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notification, setNotification] = useState(0); // 0 => empty, 1 => Loading, 2 => Done, 3 => Error
  const [notificationMessage, setNotificationMessage] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    setNameError("");
  };
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setPasswordError("");
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const isFormValid = () => {
    if (name.length == 0) {
      setNameError("Name cannot be empty");
      return false;
    }

    if (!validateEmail(email)) {
      setEmailError("Email is not valid");
      return false;
    }

    if (password.length < 8) {
      setPasswordError("Password should be 8 characters or more");
      return false;
    }

    if (password != confirmPassword) {
      setPasswordError("Passwords don't match");
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (isFormValid()) {
      setNotification(1);
      setNotificationMessage("Registering...");
      const res = await authRepository.signup(name, email, password);
      if (res.status === 201) {
        setNotification(2);
        setNotificationMessage("You are Registered. Login to continue");
      } else {
        setNotification(3);
        const msg: string = res.body.err;
        setNotificationMessage(msg);
      }
    }
  };

  return (
    <div>
      <HeadingLevel>
        <Heading>Signup</Heading>
        <DisplayNotification
          message={notificationMessage}
          type={notification}
        />
        <FormControl label={() => "Name"} error={nameError}>
          <Input onChange={handleNameChange} value={name} />
        </FormControl>

        <FormControl label={() => "Email"} error={emailError}>
          <Input type="email" onChange={handleEmailChange} value={email} />
        </FormControl>

        <FormControl label={() => "Password"} error={passwordError}>
          <Input
            type="password"
            onChange={handlePasswordChange}
            value={password}
          />
        </FormControl>

        <FormControl label={() => "Confirm Password"} error={passwordError}>
          <Input
            type="password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
        </FormControl>

        <div className={right}>
          <Button kind={KIND.secondary} onClick={clearForm}>
            Clear
          </Button>
          <span className={space} />
          <Button onClick={submitForm}>Register</Button>
        </div>
      </HeadingLevel>
    </div>
  );
};

const DisplayNotification = ({
  type,
  message,
}: {
  type: number;
  message: string;
}) => {
  if (type == 0) {
    return <div></div>;
  }
  if (type == 1) {
    return <SnackbarElement progress message={message} focus={false} />;
  }
  if (type == 2) {
    return (
      <Notification kind={NKIND.positive} closeable>
        {message}
      </Notification>
    );
  }

  return (
    <Notification kind={NKIND.negative} closeable>
      {message}
    </Notification>
  );
};

export default EmailSignupForm;
