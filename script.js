const getUsersHeirarchyData = async () => {
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
getUsersHeirarchyData();

const nestHierarchy = (data, reportsTo = null) => {
  const result = {};
  const filteredData = data.filter((item) => item.reportsTo === reportsTo);

  filteredData.forEach((item) => {
    result[item.id] = {
      ...item,
      Users: nestHierarchy(data, item.id),
    };
  });
  return result;
};

const buildArray = (data) => {
  let arr = [];
  for (let datum of data) arr.push(datum);
  let result = nestHierarchy(arr, "84b1ee72-871b-4189-a09c-25cad39dd77f");

  console.log(result);
};
