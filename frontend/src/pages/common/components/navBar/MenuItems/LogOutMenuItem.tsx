import { useNavigate } from "react-router-dom";
import useLogout from "../../../api/useLogout";
import MenuItemWrapper from "./MenuItemWrapper";

export default function LogOutMenuItem({ index }: { index: number }) {
  const { mutate: logOut } = useLogout();
  const navigate = useNavigate();
  const delay = index * 1.5;

  function handleClick() {
    logOut();
    navigate("/login");
  }

  return (
    <MenuItemWrapper onClick={handleClick} delay={delay}>
      Log Out
    </MenuItemWrapper>
  );
}
