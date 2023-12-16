import type { UpdatePassword } from '../interfaces';

export const authData = {
  toApi(updatePassword: UpdatePassword) {
    const data =  {
        email: updatePassword.email,
        password: updatePassword.password,
        password_confirmation: updatePassword.passwordConfirm,
        token: updatePassword.token

      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
  },
};