export interface User {
    id: number;
    username: string;
    name : string;
    surname : string;
    password : string;
    email : string;
  }

export interface AppState {
    user : User | null;
}

export const SET_USER = 'SET_USER';
export interface SetUserAction {
    type : typeof SET_USER;
    payload : User | null;
}
export type AppActionTypes = SetUserAction;