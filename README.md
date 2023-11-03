# use-any-hook </>

[![npm version](https://img.shields.io/npm/v/use-any-hook.svg?style=flat-square)](https://www.npmjs.org/package/use-any-hook)
[![npm downloads](https://img.shields.io/npm/dm/use-any-hook.svg?style=flat-square)](https://npm-stat.com/charts.html?package=use-any-hook)

A collection of commonly used custom [React.js](https://reactjs.org) hooks for various use cases in front-end development.

## Installation

You can install the package using npm:

```bash
npm install use-any-hook
```

## Hooks

A quick quide for each hook in the [use-any-hook](https://www.npmjs.com/package/use-any-hook) package

### 1. useFetch

`useFetch` is a hook that allows you to debounce a value or function to delay its execution until a certain timeout has passed.

```javascript
import { useState } from "react";
import useDebounce from "use-any-hook";

function MyComponent() {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}
```
