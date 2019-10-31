import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from "../data.service";
import { Router } from '@angular/router';
import { from } from 'rxjs';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public form: FormGroup;

  constructor(
    private dataService: DataService,
    private router: Router
    ) { }

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(''),
      password: new FormControl('')
    });
  }

  async login() {
    let result = await this.dataService.postAuth('/auth', this.form.value);
    if (result['ACCESS_TOKEN']) {
      await window.localStorage.setItem('ACCESS_TOKEN', result['ACCESS_TOKEN'] as string);
      this.router.navigateByUrl('/clients');
    } else {
      //throw error
    }
  }

}
