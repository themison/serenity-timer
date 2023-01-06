import { UserDto } from 'src/users/dto/user-dto.interface';
import { User } from 'src/users/schemas/users.schema';

export const toUserDto = (data: User): UserDto => {
  const { _id, username, email } = data;
  const id = _id;
  const userDto: UserDto = { id, username, email };
  return userDto;
};
