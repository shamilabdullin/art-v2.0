// Выполняется до гидратации (см. ThemeInitScript), поэтому не должен зависеть
// от React и обязан быть завёрнут в try/catch — доступ к localStorage может упасть.
export const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var theme = stored === "light" || stored === "dark"
      ? stored
      : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {}
})();
`;
