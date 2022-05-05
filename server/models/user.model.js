import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const userSchema = new Schema({
  name: { 
    type: String, 
    required: false,
    trim: true,
    minlength: 2
   },
  email: { 
    type: String, 
    unique: true,
    required: true 
  },
  password_hash: { 
    type: String, 
    required: false 
  },
  profile_photo: {
    type: String,
    default: ""
  }, 
  // groups: {
  //   type: [String]
  //   //   {
  //   //     type: mongoose.Schema.Types.ObjectId,
  //   //     ref: "Group"
  //   //   }
  //   // ]
  // }
}, {
  timestamps: true,
});

userSchema.virtual('password')
  .set(function(password) {
    this._password = password;
    this.password_hash = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(password) {
    return bcrypt.compareSync(password, this.password_hash);
  },

  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return bcrypt.hashSync(password, 10);
    } catch (err) {
      return '';
    }
  },
};

export const UserModel = mongoose.model('User', userSchema);
