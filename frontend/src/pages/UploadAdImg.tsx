import React, { useState } from "react";
import axios from "axios";

const UploadAdImg = () => {
  const [image, setImage] = useState<{ preview: string; data: File | null }>({
    preview: "",
    data: null,
  });

  const [fileInfo, setFileInfo] = useState<{ name: string; size: number; type: string }>({
    name: "",
    size: 0,
    type: "",
  });

  const [uploadStatus, setUploadStatus] = useState<string>("");

  // ✅ Gérer la sélection du fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    setImage({ preview: URL.createObjectURL(file), data: file });
    setFileInfo({ name: file.name, size: file.size, type: file.type });

    console.log("Sélectionné :", file.name, file.size, file.type);
  };

  // ✅ Gérer l'upload
  const handleUpload = async () => {
    if (!image.data) {
      setUploadStatus("❌ Aucun fichier sélectionné.");
      return;
    }

    setUploadStatus("⏳ Envoi en cours...");

    let formData = new FormData();
    formData.append("file", image.data);

    try {
      const response = await axios.post("/img", formData);
      console.log("✅ Image envoyée :", response.data);
      setUploadStatus(`✅ Image envoyée ! URL : ${response.data.filename}`);
    } catch (error) {
      console.error("❌ Erreur d'upload :", error);
      setUploadStatus("❌ Échec de l'upload.");
    }
  };

  // ✅ Supprimer l'image sélectionnée
  const handleDeleteImg = () => {
    setImage({ preview: "", data: null });
    setFileInfo({ name: "", size: 0, type: "" });
    setUploadStatus("");
    console.log("🗑️ Image supprimée.");
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-xl shadow-md max-w-md mx-auto">
      <h1 className="text-lg font-semibold mb-4">📤 Upload d’image</h1>

      {/* Aperçu de l'image */}
      {image.preview && (
        <div className="mb-4">
          <img src={image.preview} className="w-32 h-32 rounded-lg shadow-md" alt="Aperçu" />
          <button
            onClick={handleDeleteImg}
            className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md text-sm"
          >
            ❌ Supprimer l'image
          </button>
        </div>
      )}

      {/* Infos du fichier sélectionné */}
      {fileInfo.name && (
        <div className="text-sm text-gray-700 bg-gray-200 p-2 rounded-md mb-4 w-full text-center">
          <p>📂 Nom : <strong>{fileInfo.name}</strong></p>
          <p>📏 Taille : <strong>{(fileInfo.size / 1024).toFixed(2)} KB</strong></p>
          <p>📝 Type : <strong>{fileInfo.type}</strong></p>
        </div>
      )}

      {/* Input fichier */}
      <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md mb-3">
        📁 Choisir une image
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>

      {/* Bouton d'upload */}
      <button
        onClick={handleUpload}
        className="bg-green-500 text-white px-4 py-2 rounded-md mb-3 disabled:opacity-50"
        disabled={!image.data}
      >
        🚀 Envoyer l’image
      </button>

      {/* Statut de l'upload */}
      {uploadStatus && <p className="text-sm font-medium mt-2">{uploadStatus}</p>}
    </div>
  );
};

export default UploadAdImg;
