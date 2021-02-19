
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

export type State = { kind: PossibleStates.initial } |
{ kind: PossibleStates.loading } |
{ kind: PossibleStates.error, errorStr: string; } |
{ kind: PossibleStates.success, data: Array<TriviaDataStructure> };
