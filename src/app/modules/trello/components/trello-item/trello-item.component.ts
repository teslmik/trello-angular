import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ITask } from '../../../../interfaces';

@Component({
  selector: 'app-trello-item',
  templateUrl: './trello-item.component.html',
  styleUrl: './trello-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrelloItemComponent {
  @Input() tasks: ITask[];
  @Input() title!: string;

  public async toggleStatus(status: boolean, currentTask: ITask) {
    const allTasks = await JSON.parse(
      window.localStorage.getItem('tasks') || '[]'
    ) as ITask[];

    const modifyTasks = allTasks.map((task) => {
      if (task.task === currentTask.task) {
        task.status = status;
      }
      return task;
    });

    window.localStorage.setItem('tasks', JSON.stringify(modifyTasks));
  }
}
