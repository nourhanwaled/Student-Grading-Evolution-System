import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, getSortState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { ASC, DESC, SORT } from 'app/shared/util/pagination.constants';
import { overrideSortStateWithQueryParams } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './student-course-grade.reducer';

export const StudentCourseGrade = () => {
  const dispatch = useAppDispatch();

  const pageLocation = useLocation();
  const navigate = useNavigate();

  const [sortState, setSortState] = useState(overrideSortStateWithQueryParams(getSortState(pageLocation, 'id'), pageLocation.search));

  const studentCourseGradeList = useAppSelector(state => state.studentCourseGrade.entities);
  const loading = useAppSelector(state => state.studentCourseGrade.loading);

  const getAllEntities = () => {
    dispatch(
      getEntities({
        sort: `${sortState.sort},${sortState.order}`,
      }),
    );
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?sort=${sortState.sort},${sortState.order}`;
    if (pageLocation.search !== endURL) {
      navigate(`${pageLocation.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [sortState.order, sortState.sort]);

  const sort = p => () => {
    setSortState({
      ...sortState,
      order: sortState.order === ASC ? DESC : ASC,
      sort: p,
    });
  };

  const handleSyncList = () => {
    sortEntities();
  };

  const getSortIconByFieldName = (fieldName: string) => {
    const sortFieldName = sortState.sort;
    const order = sortState.order;
    if (sortFieldName !== fieldName) {
      return faSort;
    } else {
      return order === ASC ? faSortUp : faSortDown;
    }
  };

  return (
    <div>
      <h2 id="student-course-grade-heading" data-cy="StudentCourseGradeHeading">
        <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.home.title">Student Course Grades</Translate>
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link
            to="/student-course-grade/new"
            className="btn btn-primary jh-create-entity"
            id="jh-create-entity"
            data-cy="entityCreateButton"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.home.createLabel">
              Create new Student Course Grade
            </Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {studentCourseGradeList && studentCourseGradeList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.id">ID</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('id')} />
                </th>
                <th className="hand" onClick={sort('score')}>
                  <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.score">Score</Translate>{' '}
                  <FontAwesomeIcon icon={getSortIconByFieldName('score')} />
                </th>
                <th>
                  <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.student">Student</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.course">Course</Translate>{' '}
                  <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {studentCourseGradeList.map((studentCourseGrade, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/student-course-grade/${studentCourseGrade.id}`} color="link" size="sm">
                      {studentCourseGrade.id}
                    </Button>
                  </td>
                  <td>{studentCourseGrade.score}</td>
                  <td>
                    {studentCourseGrade.student ? (
                      <Link to={`/student/${studentCourseGrade.student.id}`}>{studentCourseGrade.student.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {studentCourseGrade.course ? (
                      <Link to={`/course/${studentCourseGrade.course.id}`}>{studentCourseGrade.course.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button
                        tag={Link}
                        to={`/student-course-grade/${studentCourseGrade.id}`}
                        color="info"
                        size="sm"
                        data-cy="entityDetailsButton"
                      >
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/student-course-grade/${studentCourseGrade.id}/edit`}
                        color="primary"
                        size="sm"
                        data-cy="entityEditButton"
                      >
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button
                        onClick={() => (window.location.href = `/student-course-grade/${studentCourseGrade.id}/delete`)}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="studentGradingEvalutionSystemApp.studentCourseGrade.home.notFound">
                No Student Course Grades found
              </Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentCourseGrade;
