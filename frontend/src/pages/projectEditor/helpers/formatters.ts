export function formatList(items: string[], connector: string = "or"): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return items.join(` ${connector} `);

  return `${items.slice(0, -1).join(", ")} ${connector} ${
    items[items.length - 1]
  }`;
}

export function formatFileSize(fileSize: number) {
  return `${Math.round((fileSize / 1048576) * 100) / 100} MB`;
}
