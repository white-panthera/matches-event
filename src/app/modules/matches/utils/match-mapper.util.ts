import {
  MatchDetailResponse,
  MatchResponse,
} from "src/app/modules/matches/models/match-response.model";
import {
  MatchInformation,
  Match,
} from "src/app/modules/matches/models/match.model";

export const matchEventMapper = (
  matchResponse: MatchResponse
): MatchInformation => {
    
  const [primary, secondary] = matchResponse.title;
  const description: string = matchResponse.description;
  const matches: Match[] = matchMapper(matchResponse.matches);

  return {
    title: {
      primary,
      secondary,
    },
    description,
    matches,
  };
};

export const matchMapper = (matches: MatchDetailResponse[]): Match[] => {
  return matches.map((match: MatchDetailResponse) => {
    const [firstFighter, secondaryFighter] = match.fighters;

    return {
      time: match.time,
      image: match.image,
      fighter: {
        first_name: firstFighter.name,
        last_name: firstFighter.surname,
      },
      opponent: {
        first_name: secondaryFighter.name,
        last_name: secondaryFighter.surname,
      },
    };
  });
};
