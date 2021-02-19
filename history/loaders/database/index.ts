import { MongoClient } from 'mongodb';

import config from '../../config';

// export default async (): Promise<Db> => {
//   const connection = await mongoose.connect(config.databaseUrl, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//   });
//   return connection.connection.db;
// };

let connection: MongoClient | null = null;
export default async (): Promise<MongoClient> => {
    connection = await (new MongoClient(config.databaseUrl as string, { useUnifiedTopology: true }).connect());
    return connection;
}