import { MilestoneProvider } from '../providers/milestone';

import { mdiBitcoin } from '@mdi/js';

export class Milestone {
  /**
   * @type {Date}
   */
  get completedDate() {
    return this._completedDate;
  }
  set completedDate(completedDate) {
    this._completedDate = completedDate && new Date(completedDate);
  }

  async markAsCompleted() {
    return new Promise((resolve, reject) => {
      setTimeout(reject, 2500);
    });
  }

  /**
   * @returns {Promise<Array<Milestone>>}
   */
  static async getMilestones() {
    const response = await MilestoneProvider.getMilestones();
    const milestones = response.map(Milestone.fromJson);

    milestones.push(Milestone.finalMilestone);

    return milestones.sort((a, b) => a.id - b.id);
  }

  static fromJson(response) {
    const milestone = new Milestone();

    Object.assign(milestone, response);

    return milestone;
  }

  static get finalMilestone() {
    const milestone = new Milestone();

    milestone.id = 'Bitcoin';
    milestone.title = 'Bitcoin';
    milestone.status = 'notstarted';
    milestone.icon = {
      path: mdiBitcoin,
      color: '#f90',
    };

    return milestone;
  }
}
