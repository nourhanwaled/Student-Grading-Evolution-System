import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './student-course.reducer';

export const StudentCourseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const studentCourseEntity = useAppSelector(state => state.studentCourse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="studentCourseDetailsHeading">
          <Translate contentKey="studentGradingEvalutionSystemApp.studentCourse.detail.title">StudentCourse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{studentCourseEntity.id}</dd>
          <dt>
            <Translate contentKey="studentGradingEvalutionSystemApp.studentCourse.student">Student</Translate>
          </dt>
          <dd>{studentCourseEntity.student ? studentCourseEntity.student.id : ''}</dd>
          <dt>
            <Translate contentKey="studentGradingEvalutionSystemApp.studentCourse.course">Course</Translate>
          </dt>
          <dd>{studentCourseEntity.course ? studentCourseEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/student-course" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/student-course/${studentCourseEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default StudentCourseDetail;
