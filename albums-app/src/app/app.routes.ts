import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { AlbumsComponent } from './pages/albums/albums';
import { AlbumDetailComponent} from './pages/album-detail/album-detail';
import { AlbumPhotos } from './pages/album-photos/album-photos';

export const routes: Routes = [
    {path:'', redirectTo: 'home', pathMatch:'full'},
    {path: 'home', component: Home},
    {path: 'about', component: About},
    {path: 'albums', component: AlbumsComponent},
    {path: 'albums/:id', component: AlbumDetailComponent},
    {path: 'albums/:id/photos', component: AlbumPhotos},
    {path: '**', redirectTo: 'home'}
];
