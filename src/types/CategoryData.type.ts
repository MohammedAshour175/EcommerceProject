export interface CategoryData {
    results: number;
    metadata: Metadata;
    data: CategoryDeta[];
}

export interface CategoryDeta {
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
}