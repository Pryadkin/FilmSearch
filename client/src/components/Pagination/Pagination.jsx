import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import doubleArrowIcon from '../../img/icons/double-arrow.svg';

import styles from './Pagination.module.scss';
import cx from 'classnames';
import { setNumberPagination } from '../../redux/actions';

const Pagination = ({ amountBtns = 10, totalPages }) => {
  const dispatch = useDispatch();
  const currentBtn = useSelector(state => state.movieStateReducer.currentNumberPagination);
  const history = useHistory();
  const { movie } = useParams();
  const [firstBtn, setFirstBtn] = useState(1);

  const finalAmountBtns = amountBtns > totalPages ? totalPages : amountBtns;
  const centerBtn = Math.floor(amountBtns / 2) + firstBtn;
  const beginBtn = 1;
  const endBtn = totalPages - finalAmountBtns + 1;

  const arrowBtn = new Array(finalAmountBtns).fill(null);

  useEffect(() => {
    history.push(`/search/${movie}/${currentBtn}`);
    paginationOffset();
  }, [currentBtn]);

  const paginationOffset = () => {
    const offset = currentBtn - centerBtn;
    const firstBtnOffset = firstBtn + offset;

    if (offset < 0) {
      setFirstBtn(Math.max(firstBtnOffset, beginBtn))
    }
    if (offset > 0) {
      setFirstBtn(Math.min(firstBtnOffset, endBtn))
    }
  };

  const arrowLeftOnClickHandler = () => {
    setFirstBtn(beginBtn);
    dispatch(setNumberPagination(beginBtn))
  };

  const arrowRightOnClickHandler = () => {
    setFirstBtn(endBtn);
    dispatch(setNumberPagination(totalPages))
  };

  return (
    <div className={styles.pagination}>
      <div className={styles.container}>
        <div className={cx(
          styles.double_arrow_left,
          firstBtn !== 1 ? null : styles.hidden)}
        >
          <img
            src={doubleArrowIcon}
            alt="double arrow left"
            onClick={arrowLeftOnClickHandler}
          />
        </div>

        {arrowBtn.map((item, index) => {
          const titleBtn = index + firstBtn;
          return (
            <button
              key={index}
              onClick={() => dispatch(setNumberPagination(titleBtn))}
              className={cx(
                (titleBtn === currentBtn ? "btn-secondary" : "btn-light"),
                "btn  mx-2 border border-dark")}
            >
              {titleBtn}
            </button>
          )
        }
        )}

        <div className={cx(
          styles.double_arrow_right,
          (firstBtn + finalAmountBtns - 1) !== totalPages ? null : styles.hidden)}
        >
          <img
            src={doubleArrowIcon}
            alt="double arrow right"
            onClick={arrowRightOnClickHandler}
          />
        </div>
      </div>
    </div>
  )
}

export default Pagination;