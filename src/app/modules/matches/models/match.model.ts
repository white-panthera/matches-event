export interface MatchInformation {
  title: {
    primary: string;
    secondary: string;
  };
  description: string;
  matches: Match[];
}

export interface MatchEvent {
  dateTime: string;
  location: string;
}

export interface Match {
  time: string;
  image: string;
  fighter: Person;
  opponent: Person;
}

export interface Person {
  first_name: string;
  last_name: string;
}
