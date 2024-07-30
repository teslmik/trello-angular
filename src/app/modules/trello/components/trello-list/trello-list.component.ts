import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap } from 'rxjs';

import { ITask, ITrelloList } from '../../../../interfaces';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-trello-list',
  templateUrl: './trello-list.component.html',
  styleUrl: './trello-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrelloListComponent {
  public reload$: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  public tasks: ITask[] = [];
  public model$: Observable<ITrelloList>;

  constructor(private authService: AuthService) {
    this.model$ = this.reload$.pipe(switchMap(() => this.initModel()))
  }

  public initModel(): Observable<ITrelloList> {
    const tasks: ITask[] = JSON.parse(
      window.localStorage.getItem('tasks') || '[]'
    );
    const name = this.authService.activeUser?.name;
    const model: ITrelloList = {
      assignedForMe: [],
      assignedFromMe: []
    }

    tasks.forEach((task) => {
      if (task.worker === name) {
        model.assignedForMe.push(task);
      } else if (task.creator === name) {
        model.assignedFromMe.push(task);
      }
    });

    return of(model);
  }
}
