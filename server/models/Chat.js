import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  title: {
    type: String,
    default: 'New Conversation'
  }
}, {
  timestamps: true
});

chatSchema.index({ user: 1, createdAt: -1 });

export default mongoose.model('Chat', chatSchema);

