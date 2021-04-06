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

  /**
   * @type {Date}
   */
  get startedDate() {
    return this._startedDate;
  }
  set startedDate(startedDate) {
    this._startedDate = startedDate && new Date(startedDate);
  }

  get isCompleted() {
    return this.status === 'completed';
  }

  get isInProgress() {
    return this.status === 'inprogress';
  }

  /**
   * @type {String}
   */
  get nextStatus() {
    let nextStatus;
    switch (this.status) {
      case 'notstarted':
        nextStatus = 'inprogress';
        break;
      case 'inprogress':
        nextStatus = 'completed';
        break;
      case 'completed':
        throw new Error('No status after completed');
      default:
        throw new Error('Invalid current status');
    }
    return nextStatus;
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

  /**
   * @returns {Promise<Array<Milestone>>}
   */
  async updateStatus() {
    await MilestoneProvider.updateStatus(this.id, this.nextStatus);
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
