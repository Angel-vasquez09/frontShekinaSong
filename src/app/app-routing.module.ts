import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filtro/todas',
    pathMatch: 'full'
  },
  {
    path: 'filtro/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'create',
    component:CreateComponent
  },
  {
    path: 'search/:filter',
    component: SearchComponent,
    pathMatch: 'full'
  },
  {
    path: 'lista-canciones',
    loadChildren: () => import('./lista-canciones/lista-canciones.module').then( m => m.ListaCancionesPageModule)
  }
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
