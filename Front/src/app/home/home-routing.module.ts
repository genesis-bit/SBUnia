import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FerramentasComponent } from './ferramentas/ferramentas.component';
import { EmprestimoComponent } from './emprestimo/emprestimo.component';
import { LivroComponent } from './livro/livro.component';
import { BibliotecarioComponent } from './bibliotecario/bibliotecario.component';
import { EstudanteComponent } from './estudante/estudante.component';
import { PrateleiraComponent } from './prateleira/prateleira.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "ferramenta", component: FerramentasComponent },
  { path: "emprestimo", component: EmprestimoComponent },
  { path: "livro", component: LivroComponent },
  { path: "bibliotecario", component: BibliotecarioComponent },
  { path: "estudante", component: EstudanteComponent },
  { path: "prateleira", component: PrateleiraComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
