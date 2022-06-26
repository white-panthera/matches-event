import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

// Environment
import { environment } from "src/environments/environment";

// Models
import { MatchResponse } from 'src/app/modules/matches/models/match-response.model';
import { MatchInformation } from "src/app/modules/matches/models/match.model";

// Utils
import { matchEventMapper } from "src/app/modules/matches/utils/match-mapper.util";

@Injectable({
  providedIn: "root"
})
export class MatchesService {
  constructor(private http: HttpClient) {}

  getMatches(): Observable<MatchInformation> {
    return this.http.get<MatchResponse>(`${environment.apiURL}/matches`).pipe(
      map((response: MatchResponse) => {
        if (!response) {
          throw new Error(`Invalid response`);
        }
        return matchEventMapper(response);
      })
    );
  }

}
