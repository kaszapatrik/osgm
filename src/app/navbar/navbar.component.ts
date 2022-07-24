import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
  public menuList = ['file', 'edit', 'resources', 'scripts', 'run', 'window', 'help'];
  public menuListDetails = {
      file: [],
      edit: [],
      resources: [],
      scripts: [],
      run: [],
      window: [],
      help: [],
    };

  constructor() {
  }

  ngOnInit() : void {
  }
}
