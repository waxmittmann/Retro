export enum ThoughtType {
    Positive = 1,
    Negative,
    Confusing,
  }

export interface Thought {
    id: number;
    type: ThoughtType;
    content: string;
  }