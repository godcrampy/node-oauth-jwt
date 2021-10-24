import { Layer } from "baseui/layer";
import { useEffect, useState } from "react";
import { AppNavBar, setItemActive, NavItemT } from "baseui/app-nav-bar";
import { useStyletron } from "baseui";
import { isLoggedIn, logout } from "../util/auth.util";
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => setLoggedIn(isLoggedIn()), []);

  const [css] = useStyletron();
  const [loggedInMainItems, setLoggedInMainItems] = useState<NavItemT[]>([
    { label: "Upload Resume" },
  ]);

  const [loggedOutMainItems] = useState<NavItemT[]>([
    { label: "Upload Resume" },
    { label: "Login" },
    { label: "Register" },
  ]);
  const userItems = [
    { label: "Profile" },
    { label: "Dashboard" },
    { label: "Logout" },
  ];
  function handleLoggedInMainItemSelect(item: NavItemT) {
    setLoggedInMainItems((prev) => setItemActive(prev, item));
  }

  function handleLoggedOutMainItemSelect(item: NavItemT) {
    setLoggedInMainItems((prev) => setItemActive(prev, item));
  }

  function handleUserItemSelect(item: NavItemT) {
    if (item.label == "Logout") {
      logout();
      router.push("/");
    }
  }

  return (
    <Layer>
      <div
        className={css({
          boxSizing: "border-box",
          width: "100vw",
          position: "fixed",
          top: "0",
          left: "0",
        })}
      >
        {" "}
        {loggedIn ? (
          <AppNavBar
            title="Resume Lead"
            mainItems={loggedInMainItems}
            userItems={userItems}
            onMainItemSelect={handleLoggedInMainItemSelect}
            onUserItemSelect={handleUserItemSelect}
            username={localStorage.getItem("name") || ""}
            usernameSubtitle={localStorage.getItem("email") || ""}
            userImgUrl=""
          />
        ) : (
          <AppNavBar
            title="Resume Lead"
            mainItems={loggedOutMainItems}
            onMainItemSelect={handleLoggedOutMainItemSelect}
          />
        )}
      </div>
    </Layer>
  );
};

export default Navbar;
