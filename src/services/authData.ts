import type { UpdatePassword, UserRegistrationData } from '../interfaces';

export const updatePasswordData = {
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

export const userRegistrationData = {
  toApi(userRegistration: UserRegistrationData) {
    return {
        name: userRegistration.name,
        email: userRegistration.email,
        password: userRegistration.password,
        accepted_terms_of_service_id: userRegistration.termsOfServiceAccepted
      };
  },
};