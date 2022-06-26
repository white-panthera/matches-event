export interface MatchResponse {
  title: string[];
  description: string;
  matches: MatchDetailResponse[];
}

export interface MatchDetailResponse {
  time: string;
  image: string;
  fighters: Fighters[];
}

export interface Fighters {
  name: string;
  surname: string;
}
