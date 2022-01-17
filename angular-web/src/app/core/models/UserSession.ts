import { Rol } from "./rol";

export class UserSession {
  userId?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  roles?: Rol[];

  constructor(data: {
    userId?: string;
    firstName?: string;
    email?: string;
    lastName?: string;
    roles?: Rol[];

  }) {
    if (data.userId) {
      this.userId = data.userId;
    }

    if (data.firstName) {
      this.firstName = data.firstName;
    }

    if (data.email) {
      this.email = data.email;
    }

    if (data.lastName) {
      this.lastName = data.lastName;
    }

    if (data.roles) {
      this.roles = data.roles;
    }

  }

  getUserId() {
    return this.userId ? this.userId : null;
  }

  getFullName() {
    return this.firstName && this.lastName ? `${this.lastName}, ${this.firstName}` : null;
  }

  getShortName() {
    return this.firstName || this.lastName;
  }

  getRoles() {
    return this.roles;
  }

  perteneceAPolitica(politica: string[]) {
    var autorizado: boolean = false;
    let roles = this.getRoles();

    roles!.forEach(rol => {
      if (politica.includes(rol.nombre || ''))
        autorizado = true;
    });
    return autorizado;
  }

}
