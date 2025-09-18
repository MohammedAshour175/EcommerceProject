export interface BrandsData {
    results: number;
    metadata: Metadata;
    data: BrandDet[];
}

export interface BrandDet {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Metadata {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
}
