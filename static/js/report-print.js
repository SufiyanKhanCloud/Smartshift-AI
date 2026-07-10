/* ==========================================================================
   report-print.js - binds the generated report's "Print / Save as PDF" button.

   The report opens in a blob: tab that inherits the app's Content-Security-
   Policy (no 'unsafe-inline'), so an inline onclick is blocked. This external
   script is served from the app origin, which the CSP's script-src 'self'
   allows, so it runs and wires the button.
   ========================================================================== */
(function () {
  var btn = document.getElementById('report-print-btn');
  if (btn) btn.addEventListener('click', function () { window.print(); });
})();
