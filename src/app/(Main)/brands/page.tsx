import { BrandsData } from './../../../types/BrandData.type';
import Image from 'next/image';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default async function Brands() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`, { cache: "no-store" })
    const data: BrandsData = await res.json()

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <title>Brands</title>
            <h2 className="font-manrope text-center font-extrabold text-3xl lead-10 text-black mb-9">
                All Brands
            </h2>
            <div className="flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10 justify-center items-center">
                    {data.data?.map((item) => (
                        <Dialog key={item._id}>
                            <DialogTrigger asChild>
                                <div className="cursor-pointer text-center">
                                    <Image
                                        width={250}
                                        height={250}
                                        src={item.image}
                                        alt={item.name}
                                        className="rounded-lg transition-transform hover:scale-105"
                                    />
                                    <p className="m-2 text-sm text-gray-500">{item.name}</p>
                                </div>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                    <DialogTitle className="text-3xl font-bold">{item.name}</DialogTitle>
                                    <DialogDescription>

                                        <Image
                                            width={250}
                                            height={250}
                                            src={item.image}
                                            alt={item.name}
                                            className="mx-auto rounded-lg"
                                        />
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </div>
        </div>
    )
}
