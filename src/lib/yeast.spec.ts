import { test } from "ava";

import yeast from "./yeast";

const waitUntilNextMillisecond = () => {
  const now = +new Date();
  while (+new Date() === now) {
    /* do nothing */
  }
};

test("is exported as an function", t => {
  t.is(typeof yeast, "function");
});

test("exposes the helper functions", t => {
  t.is(typeof yeast.decode, "function");
  t.is(typeof yeast.encode, "function");
});

test("returns strings", t => {
  t.is(typeof yeast(), "string");
});

test("prepends an iterated seed when previous id is the same", t => {
  waitUntilNextMillisecond();

  const ids = [yeast(), yeast(), yeast()];

  t.false(ids[0].includes("."));
  t.true(ids[1].includes(".0"));
  t.true(ids[2].includes(".1"));
});

test("resets the seed", t => {
  waitUntilNextMillisecond();

  let ids = [yeast(), yeast(), yeast()];

  t.false(ids[0].includes("."));
  t.true(ids[1].includes(".0"));
  t.true(ids[2].includes(".1"));

  waitUntilNextMillisecond();

  ids = [yeast(), yeast(), yeast()];

  t.false(ids[0].includes("."));
  t.true(ids[1].includes(".0"));
  t.true(ids[2].includes(".1"));
});

test("does not collide", t => {
  let i;
  const length = 30000;
  const ids = new Array(length);

  for (i = 0; i < length; i++) {
    ids[i] = yeast();
  }

  ids.sort();

  let collided = false;
  for (i = 0; i < length - 1; i++) {
    if (ids[i] === ids[i + 1]) {
      collided = true;
      t.fail("Found a duplicate entry");
    }
  }

  if (!collided) {
    t.pass();
  }
});

test("can convert the id to a timestamp", t => {
  waitUntilNextMillisecond();

  const id = yeast();
  const now = +new Date();

  t.is(yeast.decode(id), now);
  t.is(yeast.encode(now), id);
});
