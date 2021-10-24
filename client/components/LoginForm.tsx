import React, { useState } from "react";
import { Button, KIND } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { Heading, HeadingLevel } from "baseui/heading";
import { useStyletron } from "baseui";
import { validateEmail } from "../util/string.util";
import { Notification, KIND as NKIND } from "baseui/notification";
import { SnackbarElement } from "baseui/snackbar";
import { login } from "../util/auth.util";
import { useRouter } from "next/router";
import { authRepository } from "../repository/store";

const EmailLoginForm = () => {
  const router = useRouter();

  const [css, theme] = useStyletron();
  const space = css({ marginLeft: theme.sizing.scale300 });
  const right = css({ textAlign: "end" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(0); // 0 => empty, 1 => Loading, 2 => Done, 3 => Error
  const [notificationMessage, setNotificationMessage] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const clearForm = () => {
    setEmail("");
    setPassword("");
  };

  const isFormValid = () => {
    if (!validateEmail(email)) {
      setEmailError("Email is not valid");
      return false;
    }
    if (password.length < 8) {
      setPasswordError("Password should be 8 characters or more");
      return false;
    }
    return true;
  };

  const submitForm = async () => {
    if (isFormValid()) {
      setNotification(1);
      setNotificationMessage("Logging In...");
      const res = await authRepository.login(email, password);
      if (res.status === 200) {
        setNotification(2);
        setNotificationMessage("Onwards!");
        const { name, email, token, auth_provider } = res.body;
        login(name, email, token, auth_provider);
        router.push("/profile");
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
        <Heading>Login</Heading>
        <DisplayNotification
          message={notificationMessage}
          type={notification}
        />
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

        <div className={right}>
          <Button kind={KIND.secondary} onClick={clearForm}>
            Clear
          </Button>
          <span className={space} />
          <Button onClick={submitForm}>Login</Button>
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

export default EmailLoginForm;
