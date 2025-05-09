import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './student-course-grade.reducer';

export const StudentCourseGradeDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const studentCourseGradeEntity = useAppSelector(state => state.studentCourseGrade.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="studentCourseGradeDetailsHeading">
          <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.detail.title">StudentCourseGrade</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{studentCourseGradeEntity.id}</dd>
          <dt>
            <span id="score">
              <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.score">Score</Translate>
            </span>
          </dt>
          <dd>{studentCourseGradeEntity.score}</dd>
          <dt>
            <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.student">Student</Translate>
          </dt>
          <dd>{studentCourseGradeEntity.student ? studentCourseGradeEntity.student.id : ''}</dd>
          <dt>
            <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.course">Course</Translate>
          </dt>
          <dd>{studentCourseGradeEntity.course ? studentCourseGradeEntity.course.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/student-course-grade" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/student-course-grade/${studentCourseGradeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default StudentCourseGradeDetail;
