const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('sqlite:./database.sqlite', {
    logging: false
})

// Custom function to hash password attribute
// on User model
const hashPassword = (user, options) => {
    return bcrypt.hash(user.password, 10)
    .then(hash => {
        user.password = hash
    })
    .catch(error => {
        throw new Error(error)
    })
}

const db = {}

db.User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

db.Online = sequelize.define('online', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  socketID: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
})

db.List = sequelize.define('list', {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    }
})


db.Item = sequelize.define('item', {
  titleArtist: {
    type: Sequelize.STRING,
    allowNull: false
  }
  /*
  //I could have made two fiels, one for title and one for artist
  //but I don't know how to do that - so this will be part of my "further improvements"
  ,
  artist: {
    type: Sequelize.STRING,
    allowNull: false,
  }
  */
})

// Model associations
db.User.hasOne(db.List)
db.List.belongsTo(db.User)
db.List.hasMany(db.Item)
db.Item.belongsTo(db.List)


// Make sure password is hashed
// when user is created and updated
db.User.beforeCreate(hashPassword)
db.User.beforeUpdate(hashPassword)

db.sequelize = sequelize

module.exports = db
