import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";

// Environments
import { environment } from "src/environments/environment";

// Modules
import { AppModule } from "src/app/app.module";

import "hammerjs";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
