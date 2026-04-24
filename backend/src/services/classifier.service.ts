
interface ClassifiedGarment {
  type: string;
  damage: string;
  material: string;
  complexity: string;
}

const fakeClassifications: ClassifiedGarment[] = [
  {
    type: "t-shirt",
    damage: "small tear",
    material: "cotton",
    complexity: "low",
  },
  {
    type: "jeans",
    damage: "faded",
    material: "denim",
    complexity: "medium",
  },
  {
    type: "jacket",
    damage: "zipper broken",
    material: "polyester",
    complexity: "high",
  },
  {
    type: "dress",
    damage: "stain",
    material: "silk",
    complexity: "medium",
  },
  {
    type: "sweater",
    damage: "pilling",
    material: "wool",
    complexity: "low",
  },
];

export const classifyGarment = async (
  _imagePath: string
): Promise<ClassifiedGarment> => {

  const processingTime = 5000 + Math.random() * 2000;
  await new Promise((resolve) => setTimeout(resolve, processingTime));

  const randomIndex = Math.floor(Math.random() * fakeClassifications.length);
  return fakeClassifications[randomIndex];
};

