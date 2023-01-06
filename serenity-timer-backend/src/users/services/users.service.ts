import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { toUserDto } from 'src/shared/mappers/mapper';
import { CreateUserDto } from '../dto/create-user-dto.interface';
import { LoginUserDto } from '../dto/login-user-dto.interface';
import { UserDto } from '../dto/user-dto.interface';
import { User, UserDocument } from '../schemas/users.schema';
import { compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private usersModel: Model<UserDocument>) {}

  async create(userDto: CreateUserDto): Promise<UserDto> {
    const { username, password, email } = userDto;

    // check if the user exists in the db
    const userInDb = await this.usersModel.findOne({
      username,
    });
    console.log(userInDb);
    if (userInDb) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }

    const user: User = await this.usersModel.create({
      username,
      password,
      email,
    });
    return toUserDto(user);
  }

  async findOne(options?: object): Promise<UserDto> {
    const user = await this.usersModel.findOne(options);

    return toUserDto(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec();
  }

  async findByLogin({ username, password }: LoginUserDto): Promise<UserDto> {
    const user = await this.usersModel.findOne({ username });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }

    // compare passwords
    const areEqual = await compare(password, user.password);
    console.log(areEqual);

    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    return toUserDto(user);
  }

  async findByPayload({ username }: any): Promise<UserDto> {
    return await this.findOne({
      username,
    });
  }
}
