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
import { StudentCourseDTO } from '../../service/dto/student-course.dto';
import { StudentCourseService } from '../../service/student-course.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/student-courses')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('student-courses')
export class StudentCourseController {
  logger = new Logger('StudentCourseController');

  constructor(private readonly studentCourseService: StudentCourseService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StudentCourseDTO,
  })
  async getAll(@Req() req: Request): Promise<StudentCourseDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.studentCourseService.findAndCount({
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
    type: StudentCourseDTO,
  })
  async getOne(@Param('id') id: number): Promise<StudentCourseDTO> {
    return await this.studentCourseService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create studentCourse' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StudentCourseDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() studentCourseDTO: StudentCourseDTO): Promise<StudentCourseDTO> {
    const created = await this.studentCourseService.save(studentCourseDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StudentCourse', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update studentCourse' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StudentCourseDTO,
  })
  async put(@Req() req: Request, @Body() studentCourseDTO: StudentCourseDTO): Promise<StudentCourseDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StudentCourse', studentCourseDTO.id);
    return await this.studentCourseService.update(studentCourseDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update studentCourse with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StudentCourseDTO,
  })
  async putId(@Req() req: Request, @Body() studentCourseDTO: StudentCourseDTO): Promise<StudentCourseDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StudentCourse', studentCourseDTO.id);
    return await this.studentCourseService.update(studentCourseDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete studentCourse' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StudentCourse', id);
    return await this.studentCourseService.deleteById(id);
  }
}
