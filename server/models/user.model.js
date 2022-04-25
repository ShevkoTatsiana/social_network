import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { 
    type: String, 
    required: false,
    unique: true,
    trim: true,
    minlength: 2
   },
  email: { 
    type: String, 
    unique: true,
    required: true 
  },
  password_hash: { type: String, required: false }
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
