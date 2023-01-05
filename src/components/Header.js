import React from "react";
import styled from "styled-components";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { Avatar } from "@material-ui/core";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
function Header() {
  const [user] = useAuthState(auth);
  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => auth.signOut()}
          src={user?.photoURL}
          alt={user?.displayName}
        />
        <AccessTimeIcon />
      </HeaderLeft>
      {/* Header Search */}
      <HeaderSearch>
        <SearchIcon />
        <input placeholder="Search Word" type="text" />
      </HeaderSearch>
      {/* Header Right */}
      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
}

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  /* 기본 세로배열에서 항목들을 가로로 배열 */
  position: fixed;
  /* position 속성을 별도로 지정해주지 않으면 기본값인 static이 적용됩니다. position 속성이 static인 요소는 HTML 문서 상에서 원래 있어야하는 위치에 배치됩니다. */
  /*  fixed로 지정하면 이렇게 요소를 항상 고정된(fixed) 위치에 배치 */
  /* absolute일 때 해당 요소는 배치 기준을 자신이 아닌 상위 요소에서 찾습니다 */
  /* relative로 설정하게 되면, 요소를 원래 위치에서 벗어나게 배치할 수 있게 됩니다.  */
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  /* --slack-color는 index.css의 body에서 설정한 변수 */
  color: white;
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 20px;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #421f44;
  text-align: center;
  display: flex;
  padding: 0 50px;
  /* padding: 네면모두 | 세로,가로 | 위 가로 아래 | 네면 */
  border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    /* 요소의 최소너비를 지정, 자매품 min-height */
    outline: 0;
    color: white;
  }
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
    /* 마우스를 아바타에 갖다 놓으면 약간 투명해짐 */
  }
`;
