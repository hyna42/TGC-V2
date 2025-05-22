import { test, expect } from "@playwright/test";

test("Header should show site name (TGC or THE GOOD CORNER V2)", async ({ page }) => {
  await page.goto("http://api_gateway:80/");
  await page.waitForLoadState("domcontentloaded");

  // Vérifie que l’un des deux titres est visible
  const title1 = page.getByText("THE GOOD CORNER V2", { exact: true });
  const title2 = page.getByText("TGC", { exact: true });

  // Attendre que l'un des deux soit visible
  await expect(Promise.any([
    title1.isVisible(),
    title2.isVisible()
  ])).resolves.toBe(true);
});
