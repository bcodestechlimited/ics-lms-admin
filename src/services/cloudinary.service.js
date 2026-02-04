class CloudinaryService {
  async uploadWithPublicSignature(payload) {
    const { file, signaturePayload } = payload;

    const formData = new FormData();

    // Match your response keys exactly
    formData.append("api_key", signaturePayload.apiKey);
    formData.append("timestamp", String(signaturePayload.timestamp));
    formData.append("signature", signaturePayload.signature);

    if (signaturePayload.folder)
      formData.append("folder", signaturePayload.folder);
    if (signaturePayload.public_id)
      formData.append("public_id", signaturePayload.public_id);
    if (signaturePayload.context)
      formData.append("context", signaturePayload.context);
    if (signaturePayload.tags) formData.append("tags", signaturePayload.tags);
    if (signaturePayload.upload_preset)
      formData.append("upload_preset", signaturePayload.upload_preset);

    formData.append("file", file);

    const url = `https://api.cloudinary.com/v1_1/${signaturePayload.cloudName}/auto/upload`;

    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || "Cloudinary upload failed");
    }

    const result = await res.json();

    return {
      publicId: result.public_id,
      url: result.secure_url,
      resourceType: result.resource_type,
      originalFilename: result.original_filename,
    };
  }
}

const cloudinaryService = new CloudinaryService();
export default cloudinaryService;
