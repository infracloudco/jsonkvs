const test = require("tape");
const fs = require("fs");
const jsonkvs = require("./");
const fixture = require("./fixture.json");

test("Should open a json file", t => {
  t.plan(1);
  const file = jsonkvs("./fixture.json");
  t.ok(file);
});
test("Should return all keys", t => {
  t.plan(1);
  const file = jsonkvs("./fixture.json");
  t.deepEqual(file.get(), fixture);
});
test("Should return single key", t => {
  t.plan(1);
  const file = jsonkvs("./fixture.json");
  t.equal(file.get("key1"), fixture["key1"]);
});
test("Should update key", t => {
  t.plan(1);
  const file = jsonkvs("./fixture.json");
  file.set("key1", "updated");
  t.equal(file.get("key1"), "updated");
});
test("Should merge objects", t => {
  t.plan(1);
  const file = jsonkvs("./fixture.json");
  const patch = {
    key1: "updated",
    new: "test"
  };
  file.set(patch);
  t.deepEqual(file.get(), { ...fixture, ...patch });
});
test("Should replace object", t => {
  t.plan(1);
  const file = jsonkvs("./fixture.json");
  const patch = {
    key1: "updated",
    new: "test"
  };
  file.set(patch, true);
  t.deepEqual(file.get(), patch);
});

test("Should remove a key", t => {
  t.plan(1);
  const file = jsonkvs("./fixture.json");
  file.del("key1");
  t.notOk(file.get()["key1"]);
});
test("Should write changes", t => {
  t.plan(1);
  const tmpFileName = "/tmp/._tmp.json";
  fs.writeFileSync(tmpFileName, "{}");
  const file = jsonkvs(tmpFileName);
  file.set("new", "test");
  file.save();
  const tmpFile = require(tmpFileName);
  fs.unlinkSync(tmpFileName);
  t.deepEqual(file.get(), tmpFile);
});
