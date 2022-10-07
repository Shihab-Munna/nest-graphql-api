/* eslint-disable @typescript-eslint/no-unused-vars */
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Owner } from '../owners/entities/owner.entity';

@Entity('pets')
@ObjectType()
export class Pet {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: true, unique: false })
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  type?: string;

  @Field((type) => Int, { nullable: true })
  ownerId: number;

  @ManyToOne(() => Owner, (owner) => owner.pets)
  @Field((type) => Owner, { nullable: true })
  owner: Owner;
}
