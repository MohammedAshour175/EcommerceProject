import { GetCategoryData } from "image/app/CategoryAction/CategoryAction";
import { CategoryData } from "image/types/CategoryData.type";
import SubCategories from "./SubCategories";

export default async function CategoryPage() {
    // 👇 هنا بتستدعي الفانكشن مباشرة من السيرفر
    const data: CategoryData = await GetCategoryData();

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
            <title>Category</title>
            <h2 className="font-manrope font-extrabold text-3xl text-center text-black mb-9">
                All Categories
            </h2>

            {/* هنا Client Component هيتعامل مع الضغط ويعرض subcategories */}
            <SubCategories categories={data.data} />
        </div>
    );
}
