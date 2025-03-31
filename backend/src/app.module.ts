import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import * as dotenv from 'dotenv';

dotenv.config();  // ✅ Load environment variables

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',  // ✅ Ensure fallback value
      port: Number(process.env.DB_PORT) || 5432,  // ✅ Convert to number
      username: process.env.DB_USER ?? 'greeshma',  // ✅ Ensure non-undefined fallback
      password: process.env.DB_PASS ?? 'defaultpassword',  // ✅ Ensure fallback
      database: process.env.DB_NAME ?? 'mydb',  // ✅ Ensure fallback
      entities: [User],
      synchronize: true,  // ❗ Set to false in production
    }),
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
