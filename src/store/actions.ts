import {User ,SET_USER,SetUserAction} from './types';

export const setUser = (user : User | null): SetUserAction => ({
    type : SET_USER,
    payload : user,
});