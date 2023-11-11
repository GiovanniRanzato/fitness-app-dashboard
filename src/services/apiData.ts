import type { User } from '../interfaces';

export const apiData = {
  prepareUser(user: User) {
    const data =  {
        name: user.name ? user.name : null,
        last_name: user.lastName ? user.lastName : null,
        phone: user.phone ? user.phone.toString() : null,
        sex: user.sex ? user.sex : null,
        weight: user.weight ? user.weight.toString(): null,
        height: user.height ? user.height.toString(): null,
        country: user.country ? user.country : null,
        city: user.city ? user.city : null,
        address: user.address ?  user.address : null
      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
    
  }
};
