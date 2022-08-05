import { atom } from "recoil";

type User = {
  id: number;
  name: string;
  imageURL: string;
};

export const loginUserState = atom<User>({
  key: "loginUserState",
  default: {
    id: 0,
    name: "",
    imageURL: "",
  },
});
