const addBtn = document.getElementById("add");
const appendBtn = document.getElementById("append");
const removeBtn = document.getElementById("remove");
const windowUrl = window.location.href;

addBtn.addEventListener("click", () => {
  const url = new URL(windowUrl);

  url.searchParams.set("key", "val");
  window.location.href = url;
});

appendBtn.addEventListener("click", () => {
  const url = new URL(windowUrl);

  url.searchParams.append("key", "val");
  window.location.href = url;
});

removeBtn.addEventListener("click", () => {
  const url = new URL(windowUrl);

  url.searchParams.delete("key");
  window.location.href = url;
});

const b =
  "https://user:pass@daily-dev-tips.com:3000/folder/page?param=xyz&new=true&param=dkd#title2";

const bUrl = new URL(b);

// we can manipulate part of the URL
bUrl.hash = "john";
bUrl.pathname = "/jjj/kkk/lll";

// toJSON() and toString() returns the same thing.
// they both return the full URL.
console.log(bUrl.toJSON(), "toJSON()");
console.log(bUrl.toString(), "toString()");

// this will output the full URL object
console.log(bUrl, "full URL object");

// this outputs the full search query
// ?param=xyz&new=true&param=dkd
console.log(bUrl.search);

// we can use the searchParams property to access the query tring
const searchParams = bUrl.searchParams;

// "get" is used to get the first value of a query key
// xyz
console.log(searchParams.get("param"), "get");

// "getAll" is used to get the values of a query key.
// it is possible to have multiple values for a query key
// it returns an array of values associated with that key
console.log(searchParams.getAll("param"), "getAll");

// "has" is used to check if a query key exists
// it returns a boolean
console.log(searchParams.has("param"), "has"); // true
console.log(searchParams.has("parr"), "has"); // false

// "keys" returns an iterator of the query keys
const keys = searchParams.keys();

for (const i of keys) {
  console.log(i, "single key");
}

// "values" returns an iterator of the query values
const values = searchParams.values();

for (const i of values) {
  console.log(i, "single value");
}

// "entries" returns an iterator of the query keys and values
const entries = searchParams.entries();

for (const i of entries) {
  // we can access the key using i[0]
  // we can access the value using i[1]
  console.log(i, "single entry");
}

// "forEach" can be used to loop over the query values and keys through a callback function
searchParams.forEach((value, key) => {
  console.log(value, "value from forEach");
  console.log(key, "key from forEach");
});

// "append" is used to add a new query key and value.
// if the key already exists, it will simply add to it without removing the other value
searchParams.append("param", "new");
console.log(bUrl.search, "search value after append");

// "set" adds the query key and value
// if the key already exist, it will remove all previous ones and add the new one
searchParams.set("param", "setValue");
console.log(bUrl.search, "search value after set");

// "sort" is used to sort the query string
searchParams.sort();
console.log(bUrl.search, "search value after sort");
