import dotenv from 'dotenv';
import app from './src/app';
import connectDatabase from './src/infrastructure/config/database';

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
  }
}

startServer();