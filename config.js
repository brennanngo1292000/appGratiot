module.exports = {
  development: {
    port: process.env.PORT || 9999,
    hostName: process.env.HOSTNAME || "192.168.100.9",
    connUri:
      process.env.MONGOOSE_URL ||
      "mongodb+srv://anhngo:Gnha992000@cluster0-2vyyy.mongodb.net/test?retryWrites=true&w=majority",
    saltOrRounds: 10,
    secret:'Gnha992000'
  }
};
