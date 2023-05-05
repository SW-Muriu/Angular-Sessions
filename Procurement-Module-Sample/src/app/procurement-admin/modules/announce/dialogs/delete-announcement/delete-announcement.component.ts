import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { takeUntil } from 'rxjs';
import { TokenStorageService } from 'src/app/core/service/token-storage.service';
import { AnnouncementService } from 'src/app/procurement-admin/data/services/anouncement.service';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { PendingAnnouncementsComponent } from '../../pending-announcements/pending-announcements.component';


@Component({
  selector: 'app-delete-announcement',
  templateUrl: './delete-announcement.component.html',
  styleUrls: ['./delete-announcement.component.sass']
})

export class DeleteAnnouncementComponent implements OnInit {

  Data: any;
  DataId: number;
  currentUser: any;


  constructor(public dialogRef: MatDialogRef<PendingAnnouncementsComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private fb: FormBuilder,
    private announcementService: AnnouncementService,
    private snackbar: SnackbarService,
    private tokenService: TokenStorageService,
  ) {

  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser().username;
    this.Data = this.data.data;

    this.DataId = this.Data.id;
  }

  confirmDelete() {
    this.announcementService
      .deleteAnnouncement(this.DataId, this.currentUser)
      .subscribe(
        (res) => {
          this.snackbar.showNotification(
            "snackbar-success",
            "Announcement deleted successfully !"
          );

          this.dialogRef.close();
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
