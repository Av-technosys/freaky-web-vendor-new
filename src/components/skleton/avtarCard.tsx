import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonAvatarCard() {
    return (
        <div className="flex items-center gap-4 border border-gray-200 p-3 rounded-md w-full">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <div className="grid gap-2 w-full">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
            </div>
        </div>
    )
}
