```
// ComponentCode Collection Structure
{
  _id: ObjectId,
  userId: ObjectId, // User ID
  name: String, // Component name
  description: String, // Component description
  versions: [
    {
      versionId: String,  // Version ID, e.g.: "v1", "v2" or using uuid
      description: String, // Version description, e.g.: "Current", "Added close button"
      code: String,       // Complete code content
      prompt: [
        {
          type: "text",
          text: String,
        },
        {
          type: "image",
          image: String,
        },
      ] | {
        type: "text",
        text: String,
      },
    },
  ],
}
```
