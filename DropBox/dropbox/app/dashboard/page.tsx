import { auth, currentUser } from '@clerk/nextjs/server'
import Dropzone from "@/components/Dropzone"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { FileType } from '@/typing';
import TableWrapper from '@/components/table/TableWrapper';

export default async function Dashboard() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth();

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return <div>Sign in to view this page</div>
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();

  // Use `user` to render user details or create UI elements

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));
  // initiatial render for hoe many files on a server to show the client to immediately use by client.
  const skeletonFiles: FileType[] = docsResults.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      fileName: data.fileName || doc.id,
      Timestamp: data.Timestamp?.toDate() || null, // ✅ Convert Firestore Timestamp safely
      fullName: data.fullName || "Unknown",
      downloadURL: data.downloadURL || "#",
      type: data.type || "unknown",
      size: data.size || 0,
    };
  });
  
  console.log(skeletonFiles);

    return (
      <div className='border-t'>
        <Dropzone  />

        <section className='container space-y-5'>
        <div className="flex justify-between items-center mb-4">
          <h2 className='text-lg font-bold px-5'>
            All files
          </h2>
        </div>
          <div>
            {/* TableWrapper */}
            <TableWrapper 
                skeletonFiles = {skeletonFiles}
            />
          </div>
        </section>
      </div>);
}
