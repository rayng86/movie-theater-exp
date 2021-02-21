
export enum PossibleStates {
  initial = 'initial',
  loading = 'loading',
  success = 'success',
  error = 'error'
}

export type TriviaDataStructure = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: Array<string>;
  question: string;
  type: string;
};

export type MoviesListDataStructure = {
  backdrop: string,
  id: number,
  poster: string,
  title: string,
};

export enum ScreenViews {
  trivia = 'trivia',
  credits = 'credits',
  none = 'none',
  trailers = 'trailers',
  silentPolicyPreroll = 'silentPolicyPreroll',
}

export type TriviaState = { kind: PossibleStates.initial } |
{ kind: PossibleStates.loading } |
{ kind: PossibleStates.error, errorStr: string; } |
{ kind: PossibleStates.success, data: Array<TriviaDataStructure> };

export type PopularMoviesState = { kind: PossibleStates.initial } |
{ kind: PossibleStates.loading } |
{ kind: PossibleStates.error, errorStr: string; } |
{ kind: PossibleStates.success, data: Array<MoviesListDataStructure> };

export type TrailerState = { kind: PossibleStates.initial } |
{ kind: PossibleStates.loading } |
{ kind: PossibleStates.error, errorStr: string; } |
{ kind: PossibleStates.success, key: string };
