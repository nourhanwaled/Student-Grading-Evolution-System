import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import StudentCourse from './student-course';
import StudentCourseDetail from './student-course-detail';
import StudentCourseUpdate from './student-course-update';
import StudentCourseDeleteDialog from './student-course-delete-dialog';

const StudentCourseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StudentCourse />} />
    <Route path="new" element={<StudentCourseUpdate />} />
    <Route path=":id">
      <Route index element={<StudentCourseDetail />} />
      <Route path="edit" element={<StudentCourseUpdate />} />
      <Route path="delete" element={<StudentCourseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StudentCourseRoutes;
