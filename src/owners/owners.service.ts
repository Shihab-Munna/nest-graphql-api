import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOwnerInput } from './dto/create-owner.input';
import { UpdateOwnerInput } from './dto/update-owner.input';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnersService {
  constructor(
    @InjectRepository(Owner) private readonly ownerRepo: Repository<Owner>,
  ) {}
  create(createOwnerInput: CreateOwnerInput) {
    const owner = this.ownerRepo.create(createOwnerInput);
    return this.ownerRepo.save(owner);
  }

  findAll() {
    return this.ownerRepo.find();
  }

  findOne(id: number) {
    return this.ownerRepo.findOneOrFail({ where: { id } });
  }

  update(id: number, updateOwnerInput: UpdateOwnerInput) {
    return this.ownerRepo.update(id, updateOwnerInput);
  }

  remove(id: number) {
    return `This action removes a #${id} owner`;
  }
}
