import { GoogleLogin } from "react-google-login";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Button } from "baseui/button";

import { useEffect, useState } from "react";
import { authRepository } from "../repository/store";
import { login } from "../util/auth.util";
import { useRouter } from "next/router";

const GoogleLoginButton = () => {
  const router = useRouter();

  useEffect(() => {
    setClientID(process.env.GAUTH_CLIENT || "");
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [clientID, setClientID] = useState("");

  const handleLogin = async (googleData: any) => {
    console.log(process.env.GAUTH_CLIENT);

    const res = await authRepository.googleAuth(googleData.tokenId);
    if (res.status === 200) {
      const { name, email, token, auth_provider } = res.body;
      login(name, email, token, auth_provider);
      router.push("/profile");
    } else {
      setModalMessage(res.body.err);
      setIsOpen(true);
    }
  };

  const handleFailure = () => {
    setModalMessage("Could not login with google");
    setIsOpen(true);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GAUTH_CLIENT || ""}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
        render={(renderProps) => (
          <Button onClick={renderProps.onClick}>Continue with Google</Button>
        )}
      />
      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.alertdialog}
      >
        <ModalHeader>Error</ModalHeader>
        <ModalBody>{modalMessage}</ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
    </div>
  );
};

export default GoogleLoginButton;
