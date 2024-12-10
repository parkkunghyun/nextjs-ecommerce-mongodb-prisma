import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";


export const metadata = {
    title: "Add Product - Flowmazon"
}

// server action방식
async function addProduct(formData: FormData) {
    "use server"
    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    // throw Error("dafa")
    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }

    await prisma.products.create({
        data: { name, description, imageUrl, price },
    });
    redirect("/");
}

export default function AddProductPage() {

    return (
        <div>
            <h1 className="text-lg font-bold mb-2 ">
                Add Product
            </h1>
            <form action={addProduct}>
                <input
                    name="name"
                    placeholder="Name"
                    required
                    className="input input-bordered mb-2 w-full" type="text"
                />

                <textarea
                    name="description"
                    placeholder="Description"
                    className="textarea min-h-[200px] textarea-bordered mb-2 w-full"
                    id=""/>
                <input
                    name="imageUrl"
                    placeholder="Image URL"
                    required
                    className="input input-bordered mb-2 w-full" type="url"
                />
                <input
                    name="price"
                    placeholder="Price"
                    required
                    className="input input-bordered mb-2 w-full" type="number"
                />
                <FormSubmitButton className=" btn-block ">
                    Add Product
                </FormSubmitButton>
            </form>
        </div>
    )
}