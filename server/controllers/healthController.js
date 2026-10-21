import mongoose from 'mongoose';

export const getHealth = (req, res) => {
  const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    success: true,
    message: 'Pretty Aura API is running',
    database: states[mongoose.connection.readyState] || 'unknown',
    time: new Date().toISOString(),
  });
};
