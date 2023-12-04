import {
    useMutation,
} from '@tanstack/react-query';
import { SignInAccount, createUserAccount ,SignOutAccount} from '../appwrite/api';
import { INewUser } from '@/types';

export const useCreateuserAccountMutation = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccountMutation = () => {
    return useMutation({
        mutationFn: (user: {email:string,password:string}) => SignInAccount(user)
    })
}
export const useSignOutAccountMutation = () => {
    return useMutation({
        mutationFn: () => SignOutAccount()
    })
}