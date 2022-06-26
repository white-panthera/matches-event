import { HttpClientModule, HttpRequest } from "@angular/common/http";
import { provideMockActions } from "@ngrx/effects/testing";
import { TestBed } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
  TestRequest,
} from "@angular/common/http/testing";
import { Observable } from "rxjs";

// Environment
import { environment } from "src/environments/environment";

// Models
import { MatchResponse } from "src/app/modules/matches/models/match-response.model";
import { MatchInformation } from "src/app/modules/matches/models/match.model";

// Service
import { MatchesService } from "src/app/modules/matches/services/matches.service";

// Utils
import { matchEventMapper } from "src/app/modules/matches/utils/match-mapper.util";

describe("MatchesService", () => {
  let matchesService: MatchesService;
  let httpMock: HttpTestingController;

  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
      providers: [MatchesService, provideMockActions(() => actions$)],
    });
    matchesService = TestBed.inject(MatchesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    const service: MatchesService = TestBed.inject(MatchesService);
    expect(service).toBeTruthy();
  });

  describe("getMatches()", () => {
    const dummyMatchResponse: MatchResponse = {
      title: ["Fight", "Card"],
      description: "SUNDAY, DECEMBER 07 2019 - 10PM DIRIYAH, SAUDI ARABIA",
      matches: [
        {
          time: "19:00",
          image: "match1.png",
          fighters: [
            {
              name: "MAGOMEDRASUL",
              surname: "MAJIDOV",
            },
            {
              name: "TOM",
              surname: "LITTLE",
            },
          ],
        },
        {
          time: "20:07",
          image: "match2.png",
          fighters: [
            {
              name: "FILIP",
              surname: "HRGOVIĆ",
            },
            {
              name: "ERIC",
              surname: "MOLINA",
            },
          ],
        },
        {
          time: "21:07",
          image: "match3.png",
          fighters: [
            {
              name: "DILLIAN",
              surname: "WHYTE",
            },
            {
              name: "MARIUSZ",
              surname: "WACH",
            },
          ],
        },
        {
          time: "22:07",
          image: "match4.png",
          fighters: [
            {
              name: "ALEXANDER",
              surname: "POVETKIN",
            },
            {
              name: "MICHAEL",
              surname: "HUNTER",
            },
          ],
        },
        {
          time: "00:00",
          image: "match5.png",
          fighters: [
            {
              name: "ANDY",
              surname: "RUIZ JR.",
            },
            {
              name: "ANTHONY",
              surname: "JOSHUA 2",
            },
          ],
        },
      ],
    };
    const dummyMatchInformation: MatchInformation = matchEventMapper(
      dummyMatchResponse
    );

    let url = `${environment.apiURL}/matches`;

    it("should send request to correct URL", () => {
      matchesService.getMatches().subscribe();

      httpMock.expectOne((testRequest: HttpRequest<any>) => {
        expect(testRequest.url).toBe(url);
        expect(testRequest.method).toBe("GET");

        return true;
      });
    });

    it("should return correct data", () => {
      matchesService.getMatches().subscribe((result: MatchInformation) => {
        expect(result).toEqual(dummyMatchInformation);
      });

      const testRequest: TestRequest = httpMock.expectOne(
        (req: HttpRequest<any>) => {
          return true;
        }
      );

      testRequest.flush(dummyMatchResponse);
    });

    it("should throw error on unexpected data response", () => {
      matchesService.getMatches().subscribe(
        (result: MatchInformation) => {
          fail("Error should be thrown");
        },
        (error) => {
          expect(error).toBeTruthy();
        }
      );

      const testRequest: TestRequest = httpMock.expectOne(
        (req: HttpRequest<any>) => {
          return true;
        }
      );

      testRequest.flush(null);
    });
  });
});
