'use client'
import { FileType } from "@/typing"
import { Button } from "../ui/button"
import { DataTable } from "./Table"
import { columns } from "./Columns"
import { useEffect, useState } from "react"
import { useUser } from "@clerk/nextjs"
import { collection, orderBy, query } from "firebase/firestore"
import { db } from "@/firebase"
import { useCollection } from 'react-firebase-hooks/firestore';
import { Skeleton } from "@/components/ui/skeleton"


function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
    const { user } = useUser();
    const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
    const [sort, setSort] = useState<"asc" | "desc">("desc");

    // Fetch files from Firestore
    const [docs, loading, error] = useCollection(
        user &&
        query(
            collection(db, "users", user.id, "files"),
            orderBy("Timestamp", sort)
        )
    );

    // for delay in file displaying table
    useEffect(() => {
        if (loading || !docs) return; // ✅ Prevents unnecessary execution

        const files: FileType[] = docs.docs.map((doc) => ({
            id: doc.id,
            fileName: doc.data().name || doc.id,
            Timestamp: new Date(doc.data().Timestamp.seconds * 1000)|| undefined,
            fullName: doc.data().fullName || "Unknown",
            downloadURL: doc.data().downloadURL || "#",
            type: doc.data().type || "unknown",
            size: doc.data().size || 0,
        }));

        setInitialFiles(files);

    }, [docs, loading]); // ✅ Only re-run when `docs` or `loading` changes

    if(docs?.docs.length === undefined)
        return (

         

            <div className="flex flex-col">
                <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </Button>

                <div className="border rounded-lg">
                    <div className="border-b h-12" />
                    {skeletonFiles.map((file) => (
                        <div 
                        key={file.id} 
                        className="flex items-center space-x-4 p-5 w-full">
                            <Skeleton className="h-12 w-12" />
                            <Skeleton className= "h-12 w-full" />
                            </div>
                    ))}

                    { skeletonFiles.length === 0 && (
                        <div className="flex items-center space-x-4 p-5 w-full">
                            <Skeleton className="h-12 w-12" />
                            <Skeleton className="h-12 w-full" />
                            </div>
                    )}
                </div>
            </div>
    );

    return (
    <div className="flex flex-col space-y-5 pb-10">
        {/* ✅ Sort Button Works */}
        <Button 
            variant={"outline"}
            onClick={() => setSort(sort === "desc" ? "asc" : "desc")} 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md ml-auto w-fit"
        >
          Sort By {sort === "desc" ? "Newest" : "Oldest"}
        </Button>

        {/* ✅ Table now displays the correct data */}
        <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
