The official Restash Node.js SDK.

## Installation

```bash
npm install @restash/node
````

## Quickstart

See the full SDK reference [here](https://docs.restash.io/sdks/node)

```typescript
import { Restash } from "@restash/node";

const restash = new Restash("sk_123456789");

const result = await restash.files.upload(file);

console.log("File uploaded:", result.url);
```

## Feedback & Support

Have questions or feature requests?
Drop an issue on [Github](https://github.com/restashio/restash-node/issues)