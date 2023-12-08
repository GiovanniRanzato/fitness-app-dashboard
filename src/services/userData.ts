import type { User, UserRole } from '../interfaces';

export const userData = {
  toApi(user: User) {
    const data =  {
        name: user.name,
        email: user.email,
        // category_id: user.category_id ? user.category_id, null,
        last_name: user.lastName ? user.lastName.toString() : '',
        phone: user.phone ? user.phone.toString() : '',
        birth_day: user.birthDate ? user.birthDate : '',
        sex: user.sex ? user.sex : '',
        weight: user.weight ? user.weight.toString() : '',
        height: user.height ? user.height.toString() : '',
        // job: user.job,
        country: user.country ? user.country : '',
        city: user.city ? user.city : '',
        postal_code: user.zip ? user.zip.toString() : null,
        address: user.address ? user.address.toString() : '',
        role: user.role ?? '0' as UserRole,
        avatar: user.avatar ? user.avatar : '',
      };
      return Object.fromEntries(
        Object.entries(data).filter(([key, value]) => value !== null)
      );
  },
  fromApi(userAttributes: any) {
    return {
      id: userAttributes.id ? userAttributes.id.toString() : '',
      name: userAttributes.name ?? '',
      email: userAttributes.email ?? '',
      lastName: userAttributes.last_name ?? '',
      phone: userAttributes.phone ?? '',
      sex: userAttributes.sex ?? '',
      birthDate: userAttributes.birth_day ?? '',
      job: userAttributes.job ?? '',
      weight: userAttributes.weight ?? 0,
      height: userAttributes.height ?? 0,
      address: userAttributes.address ?? '',
      city: userAttributes.city ?? '',
      zip: userAttributes.postal_code ?? 0,
      country: userAttributes.country ?? '',
      avatar: userAttributes.avatar ?? '',
      role: userAttributes.role ? userAttributes.role.toString() : '0' as UserRole,
    }
  },
  emptyUser() {
    return {
      id: '',
      email: '',
      name: '',
      lastName: '',
      phone: '',
      sex: '',
      birthDate: '',
      job: '',
      weight: 0,
      height: 0,
      address: '',
      city: '',
      zip: 0,
      country: '',
      avatar: '',
      role: '0' as UserRole
    }
  },
  getUserNameLastNameEmail(user: User){
    const lastName = user.lastName ? user.lastName : ''
    return `${user.name} ${lastName} (${user.email})`
  }
};


