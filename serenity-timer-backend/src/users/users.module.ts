import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './controllers/users.controller';
import { UserSchema } from './schemas/users.schema';
import { UsersService } from './services/users.service';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: 'Users',
        useFactory() {
          const userSchema = UserSchema;
          userSchema.pre('save', async function (next) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const user = this;
            if (!user.isModified('password')) return next();
            user.password = await bcrypt.hash(user.password, 10);
            next();
          });
          return userSchema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
