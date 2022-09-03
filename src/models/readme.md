Users: [keyPairs]

Rooms: [channels, users]

channels: [participants, messages]

participants: [keyPairs]

messages: [key]

key: [keyPair]

Keypair


OR in other words

Users
Keypair references [User]

Room

Channels references [room]
Particpants references [Channel, Keypair]
Key references [Channel, Keypair]
messages references [Channel, Key]



