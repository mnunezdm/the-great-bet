import { BaseProvider } from './base';

export class MilestoneProvider extends BaseProvider {
  /**
   * @returns {Promise<Array>}
   */
  static async getMilestones() {
    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/graphql`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        credentials: 'include',
        body: JSON.stringify({
          query:
            '{ milestones { id, title, description, status, completedDate, startedDate, }}',
          variables: null,
        }),
      }
    );

    const body = await this.getBody(response);

    if (response.status !== 200) {
      throw new FetchMilestones(this.getErrorMessage(body));
    }

    return body.data.milestones;
  }
}

class FetchMilestones extends Error {
  constructor(message = '', ...params) {
    super(...params);
    this.message = message;
    this.name = 'FetchMilestones';
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FetchMilestones);
    }
  }
}
