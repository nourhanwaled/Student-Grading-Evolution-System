import student from 'app/entities/student/student.reducer';
import teacher from 'app/entities/teacher/teacher.reducer';
import course from 'app/entities/course/course.reducer';
import teacherCourse from 'app/entities/teacher-course/teacher-course.reducer';
import studentCourse from 'app/entities/student-course/student-course.reducer';
import studentCourseGrade from 'app/entities/student-course-grade/student-course-grade.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  student,
  teacher,
  course,
  teacherCourse,
  studentCourse,
  studentCourseGrade,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
