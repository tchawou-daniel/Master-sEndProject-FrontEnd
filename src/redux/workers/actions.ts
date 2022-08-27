import { ActionCreator } from 'redux';

import { UpdateUserRequest } from '../../react/common/useCurrentUser';
import * as WorkersRepository from '../../services/workers/workers.repository';
import { ReduxAction, ThunkResult } from '../../types/redux';

import { ACTIONS } from './constants';

const workerStart: ActionCreator<ReduxAction> = () => ({
  type: ACTIONS.START,
});

const workerError: ActionCreator<ReduxAction> = (error: Error) => ({
  type: ACTIONS.ERROR,
  error,
});

const setWorker: ActionCreator<ReduxAction> = (worker: UpdateUserRequest) => ({
  type: ACTIONS.SET_WORKER,
  payload: { worker },
});

export const fetchWorkers = (): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(workerStart());
  try {
    const workers = await WorkersRepository.getWorkers();
    return dispatch(setWorker(workers));
  } catch (error) {
    return dispatch(workerError(error));
  }
};

export const updateWorker = (workerToUpdate: UpdateUserRequest)
: ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(workerStart());
  try {
    const udateWorker = await WorkersRepository.updateWorker(workerToUpdate);
    return dispatch(setWorker(udateWorker));
  } catch (error) {
    return dispatch(workerError(error));
  }
};
