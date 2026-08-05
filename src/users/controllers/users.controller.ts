import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsersService } from '../services/users.service';
@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) { }

    @Get()
   @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de usuarios obtenida con éxito.' })
    findAll() {
        return this.usersService.findAll(); // Sin DTOs
    }
      @Post() // Ruta POST para crear un usuario [8]
    @ApiOperation({ summary: 'Crear un nuevo usuario' })
    @ApiResponse({ status: 201, description: 'Usuario creado exitosamente.' })
  createUser(@Body() body: { name: string, email: string , password: string, isActive: boolean }) {
    return this.usersService.create(body.name, body.email, body.password, body.isActive);
  }
    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un usuario por ID' })
    deleteUser(@Param('id') id: string) {
        return this.usersService.delete(id);
    }

    @Patch(':id') // [2, 3]
    @ApiOperation({ summary: 'actualizar datos' })
    @ApiResponse({ status: 200, description: 'Lactualizacion exitosa.' })
    updateUser(
        @Param('id') id: string, // Captura el ID de la URL [4]
        @Body() updateData: { name?: string; email?: string; password?: string; isActive?: boolean } 
    ) {
        return this.usersService.update(id, updateData);
    }
}
