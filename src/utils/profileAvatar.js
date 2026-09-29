export const MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024;

export function buildProfileAvatarPath(userId, originalFileName = "avatar") {
  const cleanUserId = String(userId ?? "user").trim();
  const normalizedName = String(originalFileName ?? "avatar")
    .replace(/\\/g, "/")
    .split("/")
    .pop()
    ?.replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "avatar";

  const extension = normalizedName.includes(".")
    ? normalizedName.slice(normalizedName.lastIndexOf("."))
    : ".png";
  const baseName = normalizedName.includes(".")
    ? normalizedName.slice(0, normalizedName.lastIndexOf(".")) || "avatar"
    : normalizedName || "avatar";

  return `${cleanUserId}/${Date.now()}-${baseName.slice(0, 32)}${extension}`;
}

export function isValidProfileImage(file) {
  if (!file || typeof file !== "object") {
    return { valid: false, reason: "Selecione uma imagem válida." };
  }

  if (!file.type || !file.type.startsWith("image/")) {
    return { valid: false, reason: "Só são permitidas imagens." };
  }

  if (file.size > MAX_PROFILE_IMAGE_SIZE) {
    return { valid: false, reason: "A imagem deve ter menos de 5 MB." };
  }

  return { valid: true };
}
