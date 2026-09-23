export function formatTimeAgo(isoString?: string | null, isSpanish: boolean = false): string {
  if (!isoString) return isSpanish ? "Sin datos previos" : "No previous data";
  const diffSec = Math.floor((Date.now() - new Date(isoString).getTime()) / 1000);
  if (isNaN(diffSec) || diffSec < 0) return isSpanish ? "Reciente" : "Recent";
  if (diffSec < 60) return isSpanish ? `hace ${diffSec}s` : `${diffSec}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return isSpanish ? `hace ${diffMin}m` : `${diffMin}m ago`;
  const diffHour = Math.floor(diffMin / 60);
  return isSpanish ? `hace ${diffHour}h` : `${diffHour}h ago`;
}

export function formatEventTime(iso?: string, isSpanish: boolean = false): string {
  if (!iso) return isSpanish ? "Activo" : "Active";
  const ts = new Date(iso).getTime();
  if (isNaN(ts)) return isSpanish ? "Activo" : "Active";
  return formatTimeAgo(iso, isSpanish);
}
