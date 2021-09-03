const objectToPrettyJSON = (obj: any) => {
  return "```" + JSON.stringify(obj, null, "\t") + "```";
};

export default objectToPrettyJSON;
