# 🔴 ANGULAR - BÀI 05
# **ROUTING**

Angular Router giúp tạo Single Page Application với client-side routing.

---

## 🎯 MỤC TIÊU HỌC TẬP

Sau bài này, bạn sẽ:
- Setup Angular Router
- Tạo routes và navigation
- Sử dụng route parameters
- Implement route guards

---

## 1. **SETUP ROUTER**

**app-routing.module.ts:**
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

**app.component.html:**
```html
<nav>
  <a routerLink="/" routerLinkActive="active">Home</a>
  <a routerLink="/about" routerLinkActive="active">About</a>
</nav>
<router-outlet></router-outlet>
```

---

## 2. **ROUTE PARAMETERS**

```typescript
{ path: 'user/:id', component: UserComponent }
```

```typescript
import { ActivatedRoute } from '@angular/router';

constructor(private route: ActivatedRoute) {}

ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
}
```

---

**Bài tiếp theo:** [06. Forms](../06_forms/06_forms.md) - Template-driven và Reactive Forms.
