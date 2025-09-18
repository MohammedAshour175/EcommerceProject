import { Skeleton } from "@/components/ui/skeleton"

export function HomeLoading() {
    return (
        <>
            <div className="bg-gray-600 ">
                {
                    Array.from({ length: 6 }).map((i, el) => {
                        return <div key={el} className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    })
                }
            </div>




        </>
    )
}

