import Roles from "../roles";
import Users from '../users';

class Member {

  id;
  server;
  user;
  roles;
  nickanme;

  roleObjs; // Memoize of the roles

  constructor ({ id, user, server, roles, nickname }) {
    this.id = id
    this.server = server
    this.user = user
    this.roles = roles
    this.nickname = nickname
  }

  async getUser () {
    const user = await Users.getUser({ id: this.user })
    return user
  }

  async getRoles ({ update }) {
    if (update || !this.roles) {
      const roles = await Roles.getRoles(this.roles)
      this.roleObjs = roles
    }
    return this.roleObjs
  }

  format() {
    return {
      nickname: this.nickname,
      roles: this.roles
    }
  }

}

export default Member