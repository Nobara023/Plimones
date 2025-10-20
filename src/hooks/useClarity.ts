import { useEffect } from "react";

export const useClarity = (clarityId: string) => {
  useEffect(() => {
    // Evitar cargar Clarity más de una vez
    if (document.getElementById("clarity-script")) return;

    (function (c: any, l: Document, a: string, r: string, i: string, t?: HTMLScriptElement, y?: Node) {
      c[a] =
        c[a] ||
        function () {
          (c[a].q = c[a].q || []).push(arguments);
        };
      t = l.createElement(r) as HTMLScriptElement;
      t.id = "clarity-script"; // 👈 identificador único
      t.async = true;
      t.src = "https://www.clarity.ms/tag/" + i;
      y = l.getElementsByTagName(r)[0];
      y?.parentNode?.insertBefore(t, y);
    })(window, document, "clarity", "script", clarityId);
  }, [clarityId]);
};
