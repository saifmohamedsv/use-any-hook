# useAnyHook();

[![npm version](https://img.shields.io/npm/v/use-any-hook.svg?style=flat-square)](https://www.npmjs.org/package/use-any-hook)
[![npm downloads](https://img.shields.io/npm/dm/use-any-hook.svg?style=flat-square)](https://npm-stat.com/charts.html?package=use-any-hook)

A collection of commonly used custom [React.js](https://reactjs.org) hooks for various use cases in front-end development.

## Installation

You can install the package using npm:

```bash
npm install use-any-hook
```

## Content Summary

Thi is a quide through the usage process, jump directly to the hook you want:

###### [useFetch](https://www.npmjs.com/package/use-any-hook#1-usefetch)

###### [useDebounce](https://www.npmjs.com/package/use-any-hook#2-useDebounce)

###### [useClickOutside](https://www.npmjs.com/package/use-any-hook#3-useClickOutside)

###### [useLocalStorageWithExpiry](https://www.npmjs.com/package/use-any-hook#4-useLocalStorageWithExpiry)

###### [useForm](https://www.npmjs.com/package/use-any-hook#5-useForm)

###### [useDarkMode](https://www.npmjs.com/package/use-any-hook#6-useDarkMode)

###### [useInfiniteScroll](https://www.npmjs.com/package/use-any-hook#7-useInfiniteScroll)

###### [useMousePosition](https://www.npmjs.com/package/use-any-hook#7-useMousePosition)

###

## Usage

A quick quide for each hook in the [use-any-hook](https://www.npmjs.com/package/use-any-hook) package

```javascript
// Import your desired custom hook 1st.
import { useInfiniteScroll } from "use-any-hook";
```

### 1. useFetch

`useFetch` is a hook for making HTTP requests and managing the loading and error state of the fetched data.

```javascript
function MyComponent() {
  const [data, loading, error] = useFetch("https://api.example.com/data");

  useEffect(() => {
    // Handle data when it is available
    if (data) {
      // Do something with the fetched data
    }
  }, [data]);

  return (
    <div>
      {loading ? "Loading..." : null}
      {error ? "Error: Unable to fetch data" : null}
      {data ? <div>Data: {data}</div> : null}
    </div>
  );
}
```

### 2. useDebounce

`useDebounce` is a hook that allows you to debounce a value or function to delay its execution until a certain timeout has passed.

```javascript
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

### 3. useClickOutside

`useClickOutside` detects clicks outside of a specified element and triggers a callback.

```javascript
function MyComponent() {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useClickOutside(ref, () => {
    setIsOpen(false);
  });

  return (
    <div ref={ref}>{isOpen ? "Click outside to close" : "Click to open"}</div>
  );
}
```

### 4. useLocalStorageWithExpiry

`useLocalStorageWithExpiry` extends useLocalStorage to store values with an expiration time.

```javascript
function MyComponent() {
  const [data, setData] = useLocalStorageWithExpiry("myData", null, 60000);

  return <div>Data from local storage: {data}</div>;
}
```

### 5. useForm

`useForm` is a hook for handling form input state and simplifying form management.

```javascript
function MyComponent() {
  const { values, handleChange, resetForm } = useForm({
    username: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Use the form values for submission
    console.log("Submitted data:", values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        value={values.username}
        onChange={handleChange}
        placeholder="Username"
      />

      <button type="submit">Submit</button>
      <button type="button" onClick={resetForm}>
        Reset
      </button>
    </form>
  );
}
```

### 6. useDarkMode

`useDarkMode` is a hook for managing the theme, such as toggling between light and dark mode.

```javascript
function MyComponent() {
  const { isDarkMode, toggleTheme } = useDarkMode();

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      {isDarkMode ? "Dark Mode" : "Light Mode"}
    </div>
  );
}
```

### 7. useInfiniteScroll

`useInfiniteScroll` This hook helps you implement infinite scrolling in your application, fetching and appending data as the user scrolls.

```javascript
function InfiniteScrollExample() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  // Simulated function to fetch more data
  const fetchMoreData = async () => {
    // Simulated API call to fetch more items (e.g., from a backend server)
    const response = await fetch(`https://api.example.com/items?page=${page}`);
    const newData = await response.json();

    // Update the items and page
    setItems([...items, ...newData]);
    setPage(page + 1);
  };

  const isFetching = useInfiniteScroll(fetchMoreData);

  useEffect(() => {
    // Initial data fetch when the component mounts
    fetchMoreData();
  }, []);

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {isFetching && <p>Loading more items...</p>}
    </div>
  );
}
```

### 8. useMousePosition

`useMousePosition` is a hook for detecting the mouse position in a specific div x,y axis.

```javascript
function MyComponent() {
  const ref = React.useRef(null);
  const { x, y } = useMousePosition(ref);

  return (
    <div ref={ref}>
      Mouse Position: `x-axis: ${x}, y-axis: ${x}`
    </div>
  );
}
```

### 9. useGeoLocation

`useGeoLocation` is a hook for detecting the user accurate position in latitude and longitude after asking for permission.

```javascript
function MyComponent() {
  const { location, error } = useGeoLocation();

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {location ? (
        <div>
          Latitude: {location.latitude}, Longitude: {location.longitude}
        </div>
      ) : (
        <div>Fetching location...</div>
      )}
    </div>
  );
}

```
