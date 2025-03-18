import { useState } from "react";

const UploadAdImg = () => {
  const [image, setImage] = useState<{ preview: string; data: File | null }>({
    preview: "",
    data: null,
  });

  const [fileInfo, setFileInfo] = useState<{
    name: string;
    size: number;
    type: string;
  }>({
    name: "",
    size: 0,
    type: "",
  });

  const [status, setStatus] = useState<string>("");

  // ✅ Gérer la sélection du fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    setImage({ preview: URL.createObjectURL(file), data: file });

    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    console.log("Nom du fichier :", file.name);
    console.log("Taille du fichier :", file.size);
    console.log("Type MIME du fichier :", file.type);
    console.log("Date de modification :", new Date(file.lastModified));
  };

  // ✅ Gérer l'envoi du fichier au serveur
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!image.data) {
      setStatus("Aucune image sélectionnée.");
      return;
    }

    let formData = new FormData();
    formData.append("file", image.data);

    try {
      const response = await fetch("http://localhost:5000/img/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Uploaded Image URL:", result.url);

      if (response.ok) {
        setStatus(`Image envoyée avec succès ! URL: ${result.url}`);
      } else {
        setStatus("Échec de l'upload.");
      }
    } catch (error) {
      console.error("Erreur d'upload :", error);
      setStatus("Erreur lors de l'upload.");
    }
  };

  // ✅ Gérer la suppression de l'image sélectionnée
  const handleDeleteImg = () => {
    setImage({ preview: "", data: null });
    setFileInfo({ name: "", size: 0, type: "" });
    setStatus("");
    console.log("Image supprimée.");
  };

  return (
    <div className="App">
      <h1>Upload d’image</h1>

      {/* Aperçu de l'image */}
      {image.preview && (
        <div>
          <img src={image.preview} width="100" height="100" alt="Preview" />
          <button onClick={handleDeleteImg} style={{ marginLeft: "10px" }}>
            ❌ Supprimer l'image
          </button>
        </div>
      )}

      {/* Infos du fichier sélectionné */}
      {fileInfo.name && (
        <div>
          <p>📂 Nom : {fileInfo.name}</p>
          <p>📏 Taille : {fileInfo.size} octets</p>
          <p>📝 Type : {fileInfo.type}</p>
        </div>
      )}

      {/* Formulaire d'upload */}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">📤 Envoyer l’image</button>
      </form>

      {/* Afficher le statut de l'upload */}
      {status && <h4>{status}</h4>}
    </div>
  );
};

export default UploadAdImg;
