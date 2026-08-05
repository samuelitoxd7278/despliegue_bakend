import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    // Consulta simple a la BD usando la entidad
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

      async create(name: string, email: string, password: string, isActive: boolean ): Promise<User> {
    const newUser = this.userRepository.create({ name, email, password, isActive });
    return await this.userRepository.save(newUser);
  }
   async delete(id: string): Promise<any> {
        // .delete(id) busca el registro y lo elimina físicamente de PostgreSQL [4]
        return await this.userRepository.delete(id);
    }

      async update(id: string, updateData: any): Promise<User> {
        // 1. Buscamos al usuario existente por su ID [7]
        const user = await this.userRepository.findOneBy({ id });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // 2. Mezclamos los datos existentes con los nuevos [5, 8]
        // Object.assign sobrescribe en 'user' solo las propiedades que vengan en 'updateData'
        Object.assign(user, updateData);

        // 3. Guardamos los cambios en PostgreSQL [5, 9]
        return await this.userRepository.save(user);
    }
}

