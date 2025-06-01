const extractNotionPageId = (url) => {
   // Match the 32-character hex string at the end of the URL (with or without dashes)
  const match = url.match(/([a-fA-F0-9]{32})|([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})/);

  if (!match) {
    return null;
  }

  const rawId = match[0].replace(/-/g, '');

  // Convert to dashed format: 8-4-4-4-12
  return `${rawId.substring(0, 8)}-${rawId.substring(8, 12)}-${rawId.substring(12, 16)}-${rawId.substring(16, 20)}-${rawId.substring(20)}`;
}

console.log(extractNotionPageId(''))
