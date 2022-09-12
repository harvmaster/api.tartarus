class Key {

  publicKey;   
  key;
  keyHash;       
  exposed;
  created; 

  constructor ({ publicKey, key, keyHash, exposed, create_date }) {
    this.publicKey = publicKey
    this.key = key
    this.keyHash = keyHash
    this.exposed = exposed
    this.created = create_date
  }

}

export default Key