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
import { StudentDTO } from '../../service/dto/student.dto';
import { StudentService } from '../../service/student.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { Request } from '../../client/request';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/students')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor, ClassSerializerInterceptor)
@ApiBearerAuth()
@ApiTags('students')
export class StudentController {
  logger = new Logger('StudentController');

  constructor(private readonly studentService: StudentService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: StudentDTO,
  })
  async getAll(@Req() req: Request): Promise<StudentDTO[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.studentService.findAndCount({
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
    type: StudentDTO,
  })
  async getOne(@Param('id') id: number): Promise<StudentDTO> {
    return await this.studentService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: StudentDTO,
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() studentDTO: StudentDTO): Promise<StudentDTO> {
    const created = await this.studentService.save(studentDTO, req.user?.login);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Student', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update student' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StudentDTO,
  })
  async put(@Req() req: Request, @Body() studentDTO: StudentDTO): Promise<StudentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Student', studentDTO.id);
    return await this.studentService.update(studentDTO, req.user?.login);
  }

  @Put('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Update student with id' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: StudentDTO,
  })
  async putId(@Req() req: Request, @Body() studentDTO: StudentDTO): Promise<StudentDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'Student', studentDTO.id);
    return await this.studentService.update(studentDTO, req.user?.login);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ summary: 'Delete student' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.',
  })
  async deleteById(@Req() req: Request, @Param('id') id: number): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'Student', id);
    return await this.studentService.deleteById(id);
  }
}
