import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Student from './student';
import Teacher from './teacher';
import Course from './course';
import TeacherCourse from './teacher-course';
import StudentCourse from './student-course';
import StudentCourseGrade from './student-course-grade';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="student/*" element={<Student />} />
        <Route path="teacher/*" element={<Teacher />} />
        <Route path="course/*" element={<Course />} />
        <Route path="teacher-course/*" element={<TeacherCourse />} />
        <Route path="student-course/*" element={<StudentCourse />} />
        <Route path="student-course-grade/*" element={<StudentCourseGrade />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
