import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of users',
    type: UserEntity,
    isArray: true,
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async findAll(): Promise<UserEntity[]> {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @ApiResponse({
    status: 200,
    description: 'The found user',
    type: UserEntity,
  })
  @Get(':id')
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return new UserEntity(user);
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The created user',
    type: UserEntity,
  })
  async create(@Body() data: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.userService.create(data);
    return new UserEntity(createdUser);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'The updated user',
    type: UserEntity,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async update(
    @Param('id') id: string,
    @Body() data: CreateUserDto,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const updatedUser = await this.userService.update(id, data);
    return new UserEntity(updatedUser);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'User successfully deleted' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiUnauthorizedResponse()
  async remove(@Param('id') id: string): Promise<void> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userService.remove(id);
  }
}
