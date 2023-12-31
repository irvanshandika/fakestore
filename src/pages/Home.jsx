/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCategory, getProduct, getProductByCategory } from "../services/product";
import ProductItem from "../components/ProductItem";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const [listProduct, setLisProduct] = useState([]);
  const [listCategory, setListCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const init = async () => {
    try {
      setLoading(true);
      let product = await getProduct();
      setLisProduct(product);
      let category = await getCategory();
      setListCategory(category);
      setLoading(false);
    } catch (error) {
      console.log("error while init");
      setLoading(false);
      setError(true);
    }
  };

  const getProductCategory = async (category) => {
    try {
      setLoading(true);
      const response = await getProductByCategory(category);
      console.log("response getProductCategory", response);
      setLisProduct(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error while getProductCategory");
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <Layout>
      {/* Categories */}
      <section className="flex justify-center items-center h-4 mb-16">
        {listCategory.length > 0 &&
          listCategory.map((category) => (
            <p key={category} className="mx-3 cursor-pointer hover:underline" onClick={() => getProductCategory(category)}>
              {category.replace("'s clothing", "").toUpperCase()}
            </p>
          ))}
      </section>
      {/* Categories */}
      {/* Product */}
      <section className="flex flex-wrap">
        {loading ? <p className="flex-1 items-center text-center">loading...</p> : listProduct.length > 0 && listProduct.map((product) => <ProductItem key={product.id} {...product} onClick={() => navigate(`/product/${product.id}`)} />)}
      </section>
      {/* Product */}
    </Layout>
  );
};

export default Home;
