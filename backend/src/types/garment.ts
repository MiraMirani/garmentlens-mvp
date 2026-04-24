
export type GarmentClassifier = "chatGpt" | "fikseAi";

export interface ClassifiedGarment {
  type: string;
  damage: string;
  material: string;
  complexity: string;
  classifier: GarmentClassifier;
}
