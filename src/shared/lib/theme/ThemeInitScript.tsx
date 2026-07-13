import { themeInitScript } from "./themeScript";

export function ThemeInitScript() {
  // Обычный <script>, а не next/script: должен выполниться синхронно
  // до первой отрисовки, чтобы не было мигания неверной темы (FOUC).
  return <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />;
}
