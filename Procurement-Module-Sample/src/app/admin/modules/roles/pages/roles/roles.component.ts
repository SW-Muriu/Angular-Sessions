import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AddRoleComponent } from '../add-role/add-role.component';
import { Role } from '../data/types/role';
import { DeleteRoleComponent } from '../delete-role/delete-role.component';
import { RoleComponent } from '../role/role.component';
import { UpdateRoleComponent } from '../update-role/update-role.component';

const roles: Role [] = [
  { id: 1, name: "ROLE_ADMIN" },
    { id: 2, name: "ROLE_USER" },
]

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.sass']
})
export class RolesComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'edit',
    'delete',
  ];

  
  dataSource = roles;
  isLoading: boolean = true;


  constructor(private router: Router, private dialog: MatDialog) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild("filter", { static: true }) filter: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu: MatMenuTrigger;
  contextMenuPosition = { x: "0px", y: "0px" };

  ngOnInit(): void {
  }

  addRole(){
    this.router.navigate(['/admin/roles/add-role'])
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  addRoleCall(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      test: ""
    }
    this.dialog.open(AddRoleComponent, dialogConfig)
  }

  editRoleCall(role){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      role: role
    }
    this.dialog.open(UpdateRoleComponent, dialogConfig)
  }

  roleDetailsCall(role){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      role: role
    }
    this.dialog.open(RoleComponent, dialogConfig)
  }

  deleteRoleCall(role){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "500px"
    dialogConfig.data = {
      role: role
    }
    this.dialog.open(DeleteRoleComponent, dialogConfig)
  }

  // context menu
  onContextMenu(event: MouseEvent, item: Location) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + "px";
    this.contextMenuPosition.y = event.clientY + "px";
    this.contextMenu.menuData = { item: item };
    this.contextMenu.menu.focusFirstItem("mouse");
    this.contextMenu.openMenu();
  }

}
