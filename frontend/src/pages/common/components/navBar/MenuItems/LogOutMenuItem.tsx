import { useNavigate } from "react-router-dom";
import useLogout from "../../../api/useLogout";
import MenuItemWrapper from "./MenuItemWrapper";
import { queryClient } from "../../../../../lib/queryClient";
import { useAudioPlayerStore } from "../../../services/useAudioPlayerStore";

export default function LogOutMenuItem({ index }: { index: number }) {
  const { mutate: logOut } = useLogout();
  const { closePlayer } = useAudioPlayerStore();
  const navigate = useNavigate();
  const delay = index * 1.5;

  function handleClick() {
    logOut();
    closePlayer();
    navigate("/login");
    queryClient.clear();
  }

  return (
    <MenuItemWrapper onClick={handleClick} delay={delay}>
      Log Out
    </MenuItemWrapper>
  );
}
