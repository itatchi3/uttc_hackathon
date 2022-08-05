import { atom } from "recoil";

import type { User } from "./";

/** @package */
export const loginUserState = atom<User>({
  key: "loginUserState",
  default: {
    id: 2,
    name: "itatchi",
    profile_url: "https://avatars.githubusercontent.com/u/72689870?v=4",
  },
});
