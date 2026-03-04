import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AlbumService } from '../../services/album';
import { Album } from '../../models/album.models';

@Component({
  selector: 'app-album-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './album-detail.component.html',
  styleUrls: ['./album-detail.component.css'],
})
export class AlbumDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private albumService = inject(AlbumService);

  albumId = 0;

  loading = true;
  error = '';
  album: Album | null = null;

  editTitle = '';
  saving = false;

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.albumId = Number(idParam);

    if (!this.albumId) {
      this.error = 'Invalid album id';
      this.loading = false;
      return;
    }

    this.loadAlbum();
  }

  loadAlbum(): void {
    this.loading = true;
    this.error = '';

    this.albumService.getAlbum(this.albumId).subscribe({
      next: (data) => {
        this.album = data;
        this.editTitle = data.title;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load album';
        this.loading = false;
      },
    });
  }

  saveTitle(): void {
    if (!this.album) return;

    const newTitle = this.editTitle.trim();
    if (!newTitle) return;

    this.saving = true;

    const updated: Album = { ...this.album, title: newTitle };

    this.albumService.updateAlbum(updated).subscribe({
      next: (data) => {
        this.album = data;
        this.saving = false;
      },
      error: () => {
        this.error = 'Failed to update album';
        this.saving = false;
      },
    });
  }

  deleteAlbum(): void {
    if (!confirm('Delete this album?')) return;

    this.albumService.deleteAlbum(this.albumId).subscribe({
      next: () => {
        this.router.navigate(['/albums']);
      },
      error: () => {
        this.error = 'Failed to delete album';
      },
    });
  }
}