import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { addToCart } from "../store/cartSlice";

const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 400px;
  width: 275px;
  margin: 1rem auto;
  padding: 1rem;
  border-radius: 15px;
  box-shadow: -5px -5px 10px #00000050, 2px 2px 6px #5e687930;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &&:hover {
    transform: scale(1.1);
  }
`;

export const ProductCard = ({ product }) => {
  const { name, image, desc, price, _id: id } = product;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <Card>
      <h3 className="text-[25px] font-normal">{name}</h3>
      <Link to={`/product/${id}`}>
        <img src={image.url} alt={name} className="h-[220px] object-cover object-center" />
      </Link>
      <div className="self-stretch flex justify-between items-center text-[20px] font-bold">
        <span>{desc}</span>
        <span>${price}</span>
      </div>
      <button
        className="w-full h-[40px] mt-[1rem] font-normal rounded bg-[#4b70e2] hover:bg-[#4baaee] text-white tracking-widest"
        onClick={() => {
          handleAddToCart(product);
        }}
      >
        Add To Cart
      </button>
    </Card>
  );
};
