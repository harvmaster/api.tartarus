class Role { 
  
  id;
  server;
  name;
  colour;
  permissions;
  hierarchy;
  created;

  members;

  constructor ({ id, server, name, colour, permissions, hierarchy, create_date }) {
    this.id = id
    this.server = server
    this.name = name
    this.colour = colour
    this.permissions = permissions
    this.hierarchy = hierarchy
    this.created = create_date
  }

  async getMembers ({ update }) {
    if (update || !this.members) {
      const members = Members.getWithRole(this.id)
      this.members = members
    }
    return members
  }

  format () {
    return {
      id: this.id,
      name: this.name,
      colour: this.colour,
      permissions: this.permissions,
      hierarchy: this.hierarchy,
      created: this.created
    }
  }

}

export default Role