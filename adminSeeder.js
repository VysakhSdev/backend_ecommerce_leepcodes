import bcrypt from 'bcrypt';
import User from './models/User.js';

const seedAdmin = async () => {
  try {
    const adminExists = await User.findOne({ where: { role: 'superadmin' } });

    if (adminExists) {
      console.log('Superadmin already exists. Skipping seeding...');
      return; 
    }

    const hashedPassword = await bcrypt.hash('superadmin123', 10);
    await User.create({
      name: 'Superadmin',
      email: 'superadmin@leapcode.com',
      password: hashedPassword,
      role: 'superadmin'
    });

    console.log('Superadmin created successfully for the first time!');
  } catch (error) {
    console.error(' Seeder error:', error);
  }
};

export default seedAdmin;