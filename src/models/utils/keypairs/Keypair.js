class Keypair {

  user;
  publicKey;
  privateKey;
  secretKey;
  exposed;
  created;

  constructor ({ user, publicKey, privateKey, secretKey, exposed, create_date }) {
    this.user = user
    this.publicKey = publicKey
    this.privateKey = privateKey
    this.secretKey = secretKey
    this.exposed = exposed
    this.created = create_date
  }

  getPublicFormat () {
    return {
      user: this.user,
      publicKey: this.publicKey,
      created: this.created
    }
  }

  getPrivateFormat () {
    return {
      publicKey: this.publicKey,
      privateKey: this.privateKey,
      secretKey: this.secretKey,
      exposed: this.exposed,
      created: this.created
    }
  }
}

export default Keypair