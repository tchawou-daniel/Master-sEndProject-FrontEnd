import { ActionCreator } from 'redux';

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

const setWorker: ActionCreator<ReduxAction> = (worker: Worker) => ({
  type: ACTIONS.SET_WORKER,
  payload: { worker },
});

export const fetchWorkers = (): ThunkResult<Promise<ReduxAction>> => async (dispatch) => {
  dispatch(workerStart());
  try {
    console.log('workers');
    const workers = await WorkersRepository.getWorkers();
    console.log(workers);
    return dispatch(setWorker(workers));
  } catch (error) {
    return dispatch(workerError(error));
  }
};
