import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/owners/entities/owner.entity';
import { Repository } from 'typeorm';
import { OwnersService } from '../owners/owners.service';
import { CreatePetInput } from './dtos/addPet.dto';
import { Pet } from './pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private readonly petRepo: Repository<Pet>,
    private readonly ownersService: OwnersService,
  ) {}

  async findAll(): Promise<Pet[]> {
    return await this.petRepo.find();
    const pet = new Pet();
    pet.id = 1;
    pet.name = 'Dingo';
    pet.type = 'Bird';
    return [pet];
  }

  async addPet(payload: CreatePetInput): Promise<Pet> {
    const newPet = this.petRepo.create(payload);
    return this.petRepo.save(newPet);
  }

  async findOne(id: any): Promise<Pet> {
    try {
      return this.petRepo.findOneOrFail({ where: { id } });
    } catch (error) {
      return error;
    }
  }

  async getOwner(ownerId: number): Promise<Owner> {
    try {
      return this.ownersService.findOne(ownerId);
    } catch (error) {
      return error;
    }
  }
}
