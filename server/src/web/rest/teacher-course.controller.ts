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
import { TeacherCourseDTO } from '../../service/dto/teacher-course.dto';
import { TeacherCourseService } from '../../service/teacher-course.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/teacher-courses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('teacher-courses')
export class TeacherCourseController {
  logger = new Logger('TeacherCourseController');

  constructor(private readonly teacherCourseService: TeacherCourseService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: TeacherCourseDTO,
  })
  async getAll(@Req() req: Request): Promise<TeacherCourseDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.teacherCourseService.findAndCount({
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
    type: TeacherCourseDTO,
  })
  async getOne(@Param('id') id: number): Promise<TeacherCourseDTO> {
    return await this.teacherCourseService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create teacherCourse' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: TeacherCourseDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() teacherCourseDTO: TeacherCourseDTO): Promise<TeacherCourseDTO> {
    const created = await this.teacherCourseService.save(teacherCourseDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TeacherCourse', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update teacherCourse' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TeacherCourseDTO,
  })
  async put(@Req() req: Request, @Body() teacherCourseDTO: TeacherCourseDTO): Promise<TeacherCourseDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TeacherCourse', teacherCourseDTO.id);
    return await this.teacherCourseService.update(teacherCourseDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update teacherCourse with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: TeacherCourseDTO,
  })
  async putId(@Req() req: Request, @Body() teacherCourseDTO: TeacherCourseDTO): Promise<TeacherCourseDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'TeacherCourse', teacherCourseDTO.id);
    return await this.teacherCourseService.update(teacherCourseDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete teacherCourse' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'TeacherCourse', id);
    return await this.teacherCourseService.deleteById(id);
  }
}
