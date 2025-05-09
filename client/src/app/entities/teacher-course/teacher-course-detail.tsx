import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './teacher-course.reducer';

export const TeacherCourseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const teacherCourseEntity = useAppSelector(state => state.teacherCourse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="teacherCourseDetailsHeading">
          <Translate contentKey="studentGradingEvalutionSystemApp.teacherCourse.detail.title">TeacherCourse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{teacherCourseEntity.id}</dd>
          <dt>
            <Translate contentKey="studentGradingEvalutionSystemApp.teacherCourse.teacher">Teacher</Translate>
          </dt>
          <dd>{teacherCourseEntity.teacher ? teacherCourseEntity.teacher.id : ''}</dd>
          <dt>
            <Translate contentKey="studentGradingEvalutionSystemApp.teacherCourse.course">Course</Translate>
          </dt>
          <dd>{teacherCourseEntity.course ? teacherCourseEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/teacher-course" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/teacher-course/${teacherCourseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TeacherCourseDetail;
