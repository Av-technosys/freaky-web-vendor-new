import { cn } from "@/lib/utils";
import { Button } from "../components/ui";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { TiIconPlayerPlay } from "./icons";

// const ImageViewerDialog = ({ mediaUrl, className = "" }: any) => {
//   return (
//     <>
//       <AlertDialog>
//         <AlertDialogTrigger asChild>
//           <Button
//             variant={"outline"}
//             className={cn(
//               " absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer h-7 w-7 hidden group-hover:flex",
//               className
//             )}
//           >
//             <TiIconPlayerPlay size="12" color="#D30000" />
//           </Button>
//         </AlertDialogTrigger>
//         <AlertDialogContent className="md:max-w-4xl  ">
//           <AlertDialogHeader>
//             <AlertDialogDescription>
//               <Alert className=" text-destructive border-none">
//                 <AlertDescription>
//                   <div className="w-full h-96">
//                     <img
//                       className="w-full h-full object-cover"
//                       src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${mediaUrl}`}
//                       alt="uploaded"
//                     />
//                   </div>
//                 </AlertDescription>
//               </Alert>
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Cancel</AlertDialogCancel>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// };

const ImageViewerDialog = ({ mediaUrl, className = "" }: any) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className={cn("h-7 w-7", className)}>
          <TiIconPlayerPlay size="12" color="#D30000" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="md:max-w-4xl">
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="w-full h-96">
              <img
                className="w-full h-full object-cover"
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${mediaUrl}`}
                alt="uploaded"
              />
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ImageViewerDialog;
