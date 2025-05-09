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
import { StudentCourseGradeDTO } from '../../service/dto/student-course-grade.dto';
import { StudentCourseGradeService } from '../../service/student-course-grade.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/student-course-grades')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('student-course-grades')
export class StudentCourseGradeController {
  logger = new Logger('StudentCourseGradeController');

  constructor(private readonly studentCourseGradeService: StudentCourseGradeService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StudentCourseGradeDTO,
  })
  async getAll(@Req() req: Request): Promise<StudentCourseGradeDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.studentCourseGradeService.findAndCount({
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
    type: StudentCourseGradeDTO,
  })
  async getOne(@Param('id') id: number): Promise<StudentCourseGradeDTO> {
    return await this.studentCourseGradeService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create studentCourseGrade' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StudentCourseGradeDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() studentCourseGradeDTO: StudentCourseGradeDTO): Promise<StudentCourseGradeDTO> {
    const created = await this.studentCourseGradeService.save(studentCourseGradeDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StudentCourseGrade', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update studentCourseGrade' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StudentCourseGradeDTO,
  })
  async put(@Req() req: Request, @Body() studentCourseGradeDTO: StudentCourseGradeDTO): Promise<StudentCourseGradeDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StudentCourseGrade', studentCourseGradeDTO.id);
    return await this.studentCourseGradeService.update(studentCourseGradeDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update studentCourseGrade with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StudentCourseGradeDTO,
  })
  async putId(@Req() req: Request, @Body() studentCourseGradeDTO: StudentCourseGradeDTO): Promise<StudentCourseGradeDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'StudentCourseGrade', studentCourseGradeDTO.id);
    return await this.studentCourseGradeService.update(studentCourseGradeDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete studentCourseGrade' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'StudentCourseGrade', id);
    return await this.studentCourseGradeService.deleteById(id);
  }
}
