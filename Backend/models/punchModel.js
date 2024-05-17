const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PunchSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  punchTime: {
    type: Date,
    default: Date.now,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

PunchSchema.index({ location: '2dsphere' });

const Punch = mongoose.model('Punch', PunchSchema);

module.exports = Punch;
