'use client'
import { db, storage } from "@/firebase";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { collection, serverTimestamp, addDoc, updateDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import DropzoneComponent from "react-dropzone"

function Dropzone() {
    const [loading, setLoading] = useState(false);

    const [isClient, setIsClient] = useState(false);

    const { isLoaded, isSignedIn, user } = useUser();

  useEffect(() => {
    setIsClient(true); // This ensures the component runs only on the client
  }, []);

  if (!isClient) {
    return null; // Prevents hydration errors by not rendering on the server
  }

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("File reading was aborted");
        reader.onerror = () => console.log("File reading has error");
        reader.onload = async () => {
            // do whatever you want with the file contents
           await uploadPost(file);
        };
        reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File ) => {
    if (loading) return;
    if(!user) return;
    
    setLoading(true);
     // do what need to be done
     // addDoc -> users/user12345/files
     const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fileName: selectedFile.name,
      fullName: user.fullName,
      profileImg: user.imageUrl,
      Timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
     })
     const imageRef = ref(storage, 'users/${user.id}/files/${docRef.id}')
     uploadBytes(imageRef, selectedFile).then( async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      /// update the document
      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadURL: downloadURL,

      } );
     });

     setLoading(false);
  }

    // max file size 20mb
    const maxSize = 20 * 1024 * 1024
  return (
<DropzoneComponent 
    minSize = {0} 
    maxSize = {maxSize} 
    onDrop = {onDrop}>
  {({
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections}) =>{
        const isFileToolarge =
        fileRejections.length > 0 && fileRejections[0].file.size >
        maxSize;

        return (
        <div className="m-4">
      <div {...getRootProps()}
      className= {
        cn(
            "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center ",
            isDragActive ? "bg-[#035FFE] text-white animate-pulsse": "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
        )
      }
      >
        <input {...getInputProps()} />
        {!isDragActive && "Click here drop a file to upload!"}
        {isDragActive && !isDragReject && "Drop to upload this file!"}
        {isDragReject && "File type is not accepted, sorry!"}
        {isFileToolarge && (
            <div className="text-dangerf mt-2">File is too large..</div>
        )}
      </div>
    </div>
        
    )}}
</DropzoneComponent>
  )
}

export default Dropzone
