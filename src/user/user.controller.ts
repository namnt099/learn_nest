

import { UserService } from './user.service';
import { ProfileDTO } from './dto/profile.dto';
import { Controller, UseGuards, Get, Req, Put, Param, Body } from '@nestjs/common';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
    constructor(private service: UserService) { }

    @Get('profile')
    getProfile(@Body() req: ProfileDTO) {
        console.error(req);
        return this.service.getProfile(req);
    }

    @Put('update/:id')
    updateProfile(@Param('id') id: number, @Body() req: ProfileDTO) {

        return this.service.updateProfile(id, req);
    }
    @Get('getAll')
    getAllUser() {
        return this.service.getAllUser();
    }
}
