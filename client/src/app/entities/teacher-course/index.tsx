import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TeacherCourse from './teacher-course';
import TeacherCourseDetail from './teacher-course-detail';
import TeacherCourseUpdate from './teacher-course-update';
import TeacherCourseDeleteDialog from './teacher-course-delete-dialog';

const TeacherCourseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TeacherCourse />} />
    <Route path="new" element={<TeacherCourseUpdate />} />
    <Route path=":id">
      <Route index element={<TeacherCourseDetail />} />
      <Route path="edit" element={<TeacherCourseUpdate />} />
      <Route path="delete" element={<TeacherCourseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TeacherCourseRoutes;
