const getUsersHeirarchyJSON = async () => {
  // Replace ./data.json with your JSON feed
  await fetch("./data/sample.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Work with JSON data here
      rawJSON = data;
      buildArray(rawJSON);
    })
    .catch((err) => {
      console.log(err);
      // Do something for an error here
    });
};
getUsersHeirarchyJSON();

const getUsersHeirarchyData = (data, id = null) => {
  const retailers = [];
  const distributors = [];
  const nestHierarchy = (data, id = null) => {
    const nesting = {};
    data.forEach((item) => {
      if (item.reportsTo === id) {
        const users = data.filter((user) => user.reportsTo === item.id);
        if (users.length === 0) {
          retailers.push(item);
        } else if (!data.some((user) => user.reportsTo === users[0].id)) {
          distributors.push(item);
        }
        nesting[item.id] = {
          ...item,
          Users: nestHierarchy(data, item.id),
        };
      }
    });
    return nesting;
  };
  let nesting = nestHierarchy(data, id);
  return { nesting, distributors, retailers };
};

const buildArray = (data) => {
  let arr = [];
  for (let datum of data) arr.push(datum);

  let result = {
    nesting: undefined,
    distributors: undefined,
    retailers: undefined,
  };

  result = getUsersHeirarchyData(arr, "84b1ee72-871b-4189-a09c-25cad39dd77f");

  console.log(result);
};
