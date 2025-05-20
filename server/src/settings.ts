export const settings = {
	PORT: process.env.PORT || 3500,
	MONGO_URI: process.env.mongoURI || 'mongodb://localhost:27017',
	DB_NAME: process.env.dbName || 'debts',
	EMAIL_USER: process.env.EMAIL_USER,
	EMAIL_PASS: process.env.EMAIL_PASS,
	JWT_SECRET: process.env.jwtSecret || '123',
}
