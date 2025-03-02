"use client"

import { FileType } from "@/typing"
import { ColumnDef } from "@tanstack/react-table"
import { FileIcon, defaultStyles } from 'react-file-icon';
import prettyBytes from "pretty-bytes"
import { COLOR_EXTENSION_MAP } from "@/constant"; 


export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
        const type = renderValue() as string;
        const extension: string = type.split("/")[1]
        //{image,/jpeg
        return (
            <div className="w-10">
                <FileIcon
                    extension = {extension}
                    labelColor = {COLOR_EXTENSION_MAP[extension]}
                    // @ts-ignore
                        {...defaultStyles[extension]}
                />
            </div>
        );
    },

  },
  {
    // these are mapping for constraints in typing.tsx
    accessorKey: "fileName",
    header: "FileName",
    
  },
  {
    accessorKey: "Timestamp",
    header: "Date Added",
    cell: ({ renderValue }) => {
      const Timestamp = renderValue() as Date;
      return (
        <span>
          {Timestamp ? Timestamp.toLocaleString("en-US", { 
            weekday: "short", 
            year: "numeric", 
            month: "short", 
            day: "numeric", 
            hour: "2-digit", 
            minute: "2-digit" 
          }) : "N/A"}
        </span>
      );
    },
  },
  
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
        return <span>{ prettyBytes(renderValue() as number ) }</span>;
    },
  },
  {
    accessorKey: "downloadURL",
    header: "Link",
    cell: ({ renderValue, ...props }) => (
        <a
        href={renderValue() as string}
        target="_blank"
        className="underline text-blue-500 hover:text-blue-600"
        >
            Download
        </a>
    ),
  },
]
