import React from 'react';
import { Translate } from 'react-jhipster';

import MenuItem from 'app/shared/layout/menus/menu-item';

const EntitiesMenu = () => {
  return (
    <>
      {/* prettier-ignore */}
      <MenuItem icon="asterisk" to="/student">
        <Translate contentKey="global.menu.entities.student" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/teacher">
        <Translate contentKey="global.menu.entities.teacher" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/course">
        <Translate contentKey="global.menu.entities.course" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/teacher-course">
        <Translate contentKey="global.menu.entities.teacherCourse" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/student-course">
        <Translate contentKey="global.menu.entities.studentCourse" />
      </MenuItem>
      <MenuItem icon="asterisk" to="/student-course-grade">
        <Translate contentKey="global.menu.entities.studentCourseGrade" />
      </MenuItem>
      {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
    </>
  );
};

export default EntitiesMenu;
