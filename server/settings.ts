export const settings = {
	PORT: process.env.PORT || 3500,
	MONGO_URI: process.env.mongoURI || 'mongodb://localhost:27017',
	DB_NAME: process.env.dbName || 'notes',
}
