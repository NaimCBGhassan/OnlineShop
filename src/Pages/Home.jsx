import Empty from "../assets/svg/Empty";
import Loading from "../assets/svg/Loading";
import { ProductCard } from "../components";

import { useGetProducts } from "../store/api/index";

export const Home = () => {
  const { data: products = [], isLoading, error } = useGetProducts();

  if (isLoading)
    return (
      <div className="h-[80vh] grid place-content-center text-center">
        Loading
        <Loading />
      </div>
    );

  if (error) <p className="h-[80vh] grid place-content-center">An error ocurred</p>;

  if (products.length === 0)
    return (
      <div className="h-[80vh] grid place-content-center text-center">
        <p>
          <p>There are not products</p>
          <Empty />
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] p-8">
      <h2 className="text-[5vh] font-normal col-span-full text-center py-3">New Arrivals</h2>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};
