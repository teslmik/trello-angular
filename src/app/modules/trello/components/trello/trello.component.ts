import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { ITask, IUserRegisterData } from '../../../../interfaces';
import { TrelloListComponent } from '../trello-list/trello-list.component';

@Component({
  selector: 'app-trello',
  templateUrl: './trello.component.html',
  styleUrl: './trello.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrelloComponent {
  public form: FormGroup<{ [K in keyof ITask]: FormControl<ITask[K]> }>;
  public users: IUserRegisterData[];

  @ViewChild('trelloListComponent')
  private trelloListComponent: TrelloListComponent;

  constructor(private authService: AuthService) {
    this.initForm();
    this.users = this.authService.users;
  }

  private initForm(): void {
    const dateNow = (new Date()).toLocaleDateString('en-US');
    this.form = new FormGroup<{ [K in keyof ITask]: FormControl<ITask[K]> }>({
      task: new FormControl('', [Validators.required]) as FormControl<NonNullable<ITask['task']>>,
      worker: new FormControl('') as FormControl<NonNullable<ITask['worker']>>,
      creator: new FormControl('') as FormControl<NonNullable<ITask['creator']>>,
      deadline: new FormControl(dateNow, [Validators.required]) as FormControl<NonNullable<ITask['deadline']>>,
      status: new FormControl(false) as FormControl<NonNullable<ITask['status']>>,
    });
  }

  public submit(): void {
    const task: ITask = {
      task: this.form.value.task || '',
      worker: this.form.value.worker || this.authService.activeUser?.name as string,
      creator: this.authService.activeUser?.name as string,
      deadline: this.form.value.deadline || (new Date()).toLocaleDateString('en-US'),
      status: false,
    };

    const tasks = JSON.parse(
      window.localStorage.getItem('tasks') || '[]'
    ) as ITask[];
    tasks.push(task);
    this.form.reset();
    window.localStorage.setItem('tasks', JSON.stringify(tasks));
    this.trelloListComponent.reload$.next(null);
  }
}
