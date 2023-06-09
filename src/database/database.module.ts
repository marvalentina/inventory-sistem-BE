import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

const API_KEY = '1234';
const API_KEY_PROD = '4321';

//client.query('SELECT * FROM vehicle', (err, res) => {
// console.error(err);
//  console.log(res.rows);
//});

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          entities: [__dirname + './**/*.entity{.ts,.js}'],
          type: 'postgres',
          url: configService.postgresUrl,
          synchronize: false,
          autoLoadEntities: true,
          ssl: {
            rejectUnauthorized: false,
          },
        };
      },
    }),
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: process.env.NODE_ENV === 'prod' ? API_KEY_PROD : API_KEY,
    },
    {
      provide: 'PG',
      useFactory: (configService: ConfigType<typeof config>) => {
        const client = new Client({
          connectionString: configService.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
        });
        client.connect();
        return client;
      },
      inject: [config.KEY],
    },
  ],
  exports: ['API_KEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
