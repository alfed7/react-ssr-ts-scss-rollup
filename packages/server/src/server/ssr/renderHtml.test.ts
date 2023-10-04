import renderHtml from './renderHtml'

test("SSR", () => {
  const rendered = renderHtml({}, {}, {});
  expect(rendered).toContain('<html>');
});
