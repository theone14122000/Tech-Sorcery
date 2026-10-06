/**
 * Tiny cross-section event bus: pricing CTAs pre-select a package in the
 * contact form without lifting state to the page.
 */
export const SELECT_PACKAGE_EVENT = "tech-sorcery:select-package";

export interface SelectPackageDetail {
  package: string;
}

export function requestPackage(name: string): void {
  window.dispatchEvent(
    new CustomEvent<SelectPackageDetail>(SELECT_PACKAGE_EVENT, { detail: { package: name } }),
  );
}

/** Ask the command palette (⌘K) to open. Fired by the navbar trigger. */
export const OPEN_PALETTE_EVENT = "tech-sorcery:open-palette";

export function openCommandPalette(): void {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}
