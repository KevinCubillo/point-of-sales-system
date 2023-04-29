import { Component, OnInit } from '@angular/core';
import { TasksService } from 'src/app/services/tasks.service';
import { Tasks } from '../../models/tasks.interface';


@Component({
  selector: 'app-private-tasks',
  templateUrl: './private-tasks.component.html',
  styleUrls: ['./private-tasks.component.css']
})
export class PrivateTasksComponent implements OnInit {

  tasks: Tasks[] = [];

  constructor(private tasksService: TasksService) { }
  welcomeMessage: string = '';

  ngOnInit() {
    this.welcomeMessage = localStorage.getItem('successMessage') || '';
  
    this.tasksService.getPrivateTasks()
      .subscribe(
        res => {
          console.log(res);
          this.tasks = res;
          if (this.welcomeMessage) {
            localStorage.removeItem('successMessage');
          }
        },
        err => console.log(err)
      )
  }

}
