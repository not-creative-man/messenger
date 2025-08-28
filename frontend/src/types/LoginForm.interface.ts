export interface LoginTypes {
    login: string;
    password: string;
}


export interface RegisterTypes extends LoginTypes {
    name: string;
    email: string;
    birth: Date;
    avatarUrl: string;
    
  }