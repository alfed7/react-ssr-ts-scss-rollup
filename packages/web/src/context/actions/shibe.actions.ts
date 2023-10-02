import { shibeConstants as consts } from '../constants'
import pFetch from '../../utils/proper-fetch'

export const shibeActions = {
  getShibe
}

const shibeApi = 'http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=false'
async function getShibe() {
  try {
    const response = await pFetch(shibeApi) as Response;
    checkStatus(response);
    const shibes = await response.json();
    return success(shibes);
  }
  catch(err: any) {
    return failure(err.toString());
  }
}
function success(shibes: string[]) {
  return { type: consts.GET_SHIBE_SUCCESS, value: shibes }
}
function failure(error: string) {
  return { type: consts.GET_SHIBE_FAILURE, error }
}

class HTTPResponseError extends Error {
	constructor(response: Response) {
		super(`HTTP Error Response: ${response.status} ${response.statusText}`);
		//this.response = response;
	}
}
const checkStatus = (response: Response) => {
	if (response.ok) {
		// response.status >= 200 && response.status < 300
		return response;
	} else {
		throw new HTTPResponseError(response);
	}
}