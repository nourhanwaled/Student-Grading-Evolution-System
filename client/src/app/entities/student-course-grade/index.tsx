import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import StudentCourseGrade from './student-course-grade';
import StudentCourseGradeDetail from './student-course-grade-detail';
import StudentCourseGradeUpdate from './student-course-grade-update';
import StudentCourseGradeDeleteDialog from './student-course-grade-delete-dialog';

const StudentCourseGradeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StudentCourseGrade />} />
    <Route path="new" element={<StudentCourseGradeUpdate />} />
    <Route path=":id">
      <Route index element={<StudentCourseGradeDetail />} />
      <Route path="edit" element={<StudentCourseGradeUpdate />} />
      <Route path="delete" element={<StudentCourseGradeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StudentCourseGradeRoutes;
