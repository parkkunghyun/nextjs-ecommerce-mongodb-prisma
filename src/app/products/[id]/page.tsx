import { prisma } from "@/lib/db/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import PriceTag from "@/components/PriceTag";
import { Metadata } from "next";

// ProductPageProps 수정
interface ProductPageProps {
  params: { id: string }; // params는 동기적으로 주입됩니다.
}

// Product 데이터 가져오기
const getProduct = async (id: string) => {
  const product = await prisma.products.findUnique({ where: { id } });
  if (!product) notFound();
  return product;
};

// 메타데이터 생성 함수
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(params.id);

  return {
    title: product.name + " - Flowmazon",
    description: product.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  };
}

// Product 페이지 컴포넌트
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
      <Image
        width={500}
        height={500}
        className="rounded-lg"
        priority
        src={product.imageUrl}
        alt={product.name}
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-5">{product.description}</p>
      </div>
    </div>
  );
}
