import { Component, OnInit } from '@angular/core';
import { User } from '../models/models';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  users:User[]=[];
  columnsToDisplay:string[]=[
    'id',
    'name',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'created on',
    'action',
  ];

  constructor(private api: ApiService){}

  ngOnInit(): void {
    // this.api.getAllUsers().subscribe({
    //   next: (res: User[]) => {

    //   }
    // })



    this.api.getAllUsers().subscribe({
      next: (res: User[])=> {
        this.users = [];
        this.users = res;
      },
      error:(err: any) => console.log(err),
    });

  }

  
}
