
export interface UserState {
  id: number | null;
  name: string | null;
  email: string | null;
  login: string | null;
  avatar_url: string | null;
  birth: string | null;
  isLoggedIn: boolean;
}
  
  export const initialUserState: UserState = {
    id: null,
    name: null,
    email: null,
    login: null,
    avatar_url: null,
    birth: null,
    isLoggedIn: false,
  };
  