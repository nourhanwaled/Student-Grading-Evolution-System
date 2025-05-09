import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post as PostMethod,
  Put,
  UseGuards,
  Req,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TeacherDTO } from '../../service/dto/teacher.dto';
import { TeacherService } from '../../service/teacher.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/teachers')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('teachers')
export class TeacherController {
  logger = new Logger('TeacherController');

  constructor(private readonly teacherService: TeacherService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TeacherDTO,
  })
  async getAll(@Req() req: Request): Promise<TeacherDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.teacherService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder(),
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: TeacherDTO,
  })
  async getOne(@Param('id') id: number): Promise<TeacherDTO> {
    return await this.teacherService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create teacher' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TeacherDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() teacherDTO: TeacherDTO): Promise<TeacherDTO> {
    const created = await this.teacherService.save(teacherDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Teacher', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update teacher' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TeacherDTO,
  })
  async put(@Req() req: Request, @Body() teacherDTO: TeacherDTO): Promise<TeacherDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Teacher', teacherDTO.id);
    return await this.teacherService.update(teacherDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update teacher with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TeacherDTO,
  })
  async putId(@Req() req: Request, @Body() teacherDTO: TeacherDTO): Promise<TeacherDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Teacher', teacherDTO.id);
    return await this.teacherService.update(teacherDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete teacher' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Teacher', id);
    return await this.teacherService.deleteById(id);
  }
}
