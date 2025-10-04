import { NextRequest, NextResponse } from "next/server";
import { products } from "@/data/products";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = products.find((p) => p._id === id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    const relatedProducts = products
      .filter((p) => p.category === product.category && p._id !== product._id)
      .slice(0, 4);

    return NextResponse.json({
      success: true,
      data: {
        product,
        related: relatedProducts,
      },
    });
  } catch (error) {
    console.error("Product API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}
