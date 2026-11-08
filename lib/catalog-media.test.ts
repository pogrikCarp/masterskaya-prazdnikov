import assert from "node:assert/strict";
import test from "node:test";
import { catalogMediaInput, CatalogInputError, formatCatalogPrice, getCatalogImages, MAX_PROGRAM_IMAGES } from "./catalog-media";

test("old covers remain visible and legacy upload paths are normalized", () => {
  assert.deepEqual(getCatalogImages({ imageUrl: "/uploads/old.jpg" }), ["/api/uploads/old.jpg"]);
  assert.deepEqual(getCatalogImages({ imageUrl: "/api/uploads/a.jpg", imageUrls: ["/uploads/a.jpg", "/api/uploads/b.jpg"] }), ["/api/uploads/a.jpg", "/api/uploads/b.jpg"]);
});

test("new galleries preserve order, use the first photo as cover, and can be emptied", () => {
  assert.deepEqual(catalogMediaInput({ imageUrls: ["/second.jpg", "/first.jpg", "/second.jpg"], priceFrom: true }), { imageUrls: ["/second.jpg", "/first.jpg"], imageUrl: "/second.jpg", priceFrom: true });
  assert.deepEqual(catalogMediaInput({ imageUrls: [], imageUrl: "/old.jpg", priceFrom: false }), { imageUrls: [], imageUrl: null, priceFrom: false });
});

test("old admin requests cannot silently erase additional photos or a starting-price flag", () => {
  assert.deepEqual(catalogMediaInput({ name: "Changed title" }), {});
  assert.deepEqual(catalogMediaInput({ imageUrl: "/uploads/new-cover.jpg" }), { imageUrl: "/api/uploads/new-cover.jpg" });
  assert.deepEqual(getCatalogImages({ imageUrl: "/new.jpg", imageUrls: ["/old.jpg", "/extra.jpg"] }), ["/new.jpg", "/old.jpg", "/extra.jpg"]);
});

test("invalid galleries and flags are rejected", () => {
  for (const data of [{ imageUrls: "bad" }, { imageUrls: [123] }, { imageUrls: ["javascript:alert(1)"] }, { imageUrls: ["//untrusted.example/a.jpg"] }, { imageUrls: Array(MAX_PROGRAM_IMAGES + 1).fill("/a.jpg") }, { priceFrom: "false" }]) {
    assert.throws(() => catalogMediaInput(data), CatalogInputError);
  }
});

test("fixed and starting prices are distinct, including zero and missing prices", () => {
  assert.equal(formatCatalogPrice(5000, true), `от 5\u00a0000 ₽`);
  assert.equal(formatCatalogPrice(5000), `5\u00a0000 ₽`);
  assert.equal(formatCatalogPrice(0, true), "от 0 ₽");
  assert.equal(formatCatalogPrice(undefined), null);
  assert.equal(formatCatalogPrice(-1), null);
});
