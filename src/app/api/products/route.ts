import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const type = searchParams.get("type");
    const category = searchParams.get("category");
    const bestseller = searchParams.get("bestseller");
    const limit = searchParams.get("limit");
    const search = searchParams.get("search");

    let filteredProducts = [...products];

    if (type) {
      filteredProducts = filteredProducts.filter((p) => p.type === type);
    }

    if (category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === category
      );
    }

    if (bestseller === "true") {
      filteredProducts = filteredProducts.filter((p) => p.bestseller);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.name_en.toLowerCase().includes(searchLower) ||
          p.name_ar.includes(searchLower) ||
          p.description_en.toLowerCase().includes(searchLower) ||
          p.description_ar.includes(searchLower)
      );
    }

    filteredProducts.sort((a, b) => b.date - a.date);

    if (limit) {
      const limitNum = parseInt(limit);
      if (!isNaN(limitNum) && limitNum > 0) {
        filteredProducts = filteredProducts.slice(0, limitNum);
      }
    }

    return NextResponse.json({
      success: true,
      count: filteredProducts.length,
      data: filteredProducts,
    });
  } catch (error) {
    console.error("Products API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
