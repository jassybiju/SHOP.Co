import client from "../config/redisClient.js";

export const printKeyValuePair = async () => {
  const keys = await client.keys("*");

  if (keys) {
    let jobs = [];
    for (var i = 0; i < keys.length; i++) {
      const value = await client.get(keys[i]);

      var job = {};
      job["jobId"] = keys[i];
      job["data"] = value;
      jobs.push(job);
    }

    console.log(jobs);
  }
};
