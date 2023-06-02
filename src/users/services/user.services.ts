import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dtos';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: number) {
    const user = await this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const findUser = await this.userRepo.findOne({
      where: {
        email,
      },
    });
    return findUser;
  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepo.create(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.userRepo.save(newUser);
  }

  async update(id: number, changes: UpdateUserDto) {
    const User = await this.userRepo.findOneBy({ id });
    this.userRepo.merge(User, changes);
    return this.userRepo.save(User);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  /*async getOrdersByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      materials: await this.materialsService.findAll(),
    };
  }
  getVehicles() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM vehicle', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res.rows);
      });
    });
  }*/
}
