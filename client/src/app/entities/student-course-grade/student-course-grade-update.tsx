import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IStudent } from 'app/shared/model/student.model';
import { getEntities as getStudents } from 'app/entities/student/student.reducer';
import { ICourse } from 'app/shared/model/course.model';
import { getEntities as getCourses } from 'app/entities/course/course.reducer';
import { IStudentCourseGrade } from 'app/shared/model/student-course-grade.model';
import { getEntity, updateEntity, createEntity, reset } from './student-course-grade.reducer';

export const StudentCourseGradeUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const students = useAppSelector(state => state.student.entities);
  const courses = useAppSelector(state => state.course.entities);
  const studentCourseGradeEntity = useAppSelector(state => state.studentCourseGrade.entity);
  const loading = useAppSelector(state => state.studentCourseGrade.loading);
  const updating = useAppSelector(state => state.studentCourseGrade.updating);
  const updateSuccess = useAppSelector(state => state.studentCourseGrade.updateSuccess);

  const handleClose = () => {
    navigate('/student-course-grade');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getStudents({}));
    dispatch(getCourses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  // eslint-disable-next-line complexity
  const saveEntity = values => {
    if (values.id !== undefined && typeof values.id !== 'number') {
      values.id = Number(values.id);
    }
    if (values.score !== undefined && typeof values.score !== 'number') {
      values.score = Number(values.score);
    }

    const entity = {
      ...studentCourseGradeEntity,
      ...values,
      student: students.find(it => it.id.toString() === values.student?.toString()),
      course: courses.find(it => it.id.toString() === values.course?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...studentCourseGradeEntity,
          student: studentCourseGradeEntity?.student?.id,
          course: studentCourseGradeEntity?.course?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2
            id="studentGradingEvalutionSystemApp.studentCourseGrade.home.createOrEditLabel"
            data-cy="StudentCourseGradeCreateUpdateHeading"
          >
            <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.home.createOrEditLabel">
              Create or edit a StudentCourseGrade
            </Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="student-course-grade-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('studentGradingEvalutionSystemApp.studentCourseGrade.score')}
                id="student-course-grade-score"
                name="score"
                data-cy="score"
                type="text"
              />
              <ValidatedField
                id="student-course-grade-student"
                name="student"
                data-cy="student"
                label={translate('studentGradingEvalutionSystemApp.studentCourseGrade.student')}
                type="select"
              >
                <option value="" key="0" />
                {students
                  ? students.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="student-course-grade-course"
                name="course"
                data-cy="course"
                label={translate('studentGradingEvalutionSystemApp.studentCourseGrade.course')}
                type="select"
              >
                <option value="" key="0" />
                {courses
                  ? courses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/student-course-grade" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default StudentCourseGradeUpdate;
