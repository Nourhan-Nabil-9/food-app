// import { RecipesComponent } from './user-portal.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPortalComponent } from './user-portal.component';

const routes: Routes = [
  { path: '', component: UserPortalComponent },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
// {
//         path: 'recipes',
//         loadChildren: () =>
//           import('./recipes/recipes.module').then(m => m.RecipesModule),
//       },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPortalRoutingModule { 

}
