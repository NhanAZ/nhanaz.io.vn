import test from "node:test";
import assert from "node:assert/strict";
import { locateSegment, formatTime } from "../assets/js/article-audio.js";

const segments = [{ duration: 899.75 }, { duration: 890.125 }, { duration: 57.5 }];

test("seeking uses the complete article timeline across file boundaries", () => {
  assert.deepEqual(locateSegment(segments, 899.75), { index: 1, offset: 899.75, time: 0 });
  assert.deepEqual(locateSegment(segments, 900), { index: 1, offset: 899.75, time: 0.25 });
  assert.deepEqual(locateSegment(segments, 1800), { index: 2, offset: 1789.875, time: 10.125 });
});

test("seeking clamps the beginning and end without dropping the final segment", () => {
  assert.deepEqual(locateSegment(segments, -15), { index: 0, offset: 0, time: 0 });
  assert.deepEqual(locateSegment(segments, 99999), { index: 2, offset: 1789.875, time: 57.5 });
});

test("the display supports recordings longer than an hour", () => {
  assert.equal(formatTime(3661), "1:01:01");
  assert.equal(formatTime(360000), "100:00:00");
  assert.equal(formatTime(59.9), "0:59");
  assert.equal(formatTime(-1), "0:00");
});
