import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProduct } from "../../../api";
import { addToCart } from "../../../store/cartSlice";
import Loading from "../../../assets/svg/Loading";
import { PrimaryButton } from "./CommonStyled";

export const Product = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { data: product = {}, isLoading } = useGetProduct({ id: params.id });
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <StyledProduct>
      <ProductsContainer>
        {isLoading ? (
          <div className="grid place-items-center h-full w-full">
            <Loading size="50px" />
          </div>
        ) : (
          <>
            <ImageContainer>
              <img src={product.image?.url} alt="" />
            </ImageContainer>
            <ProductDetails>
              <h3>{product.name}</h3>
              <p>
                <span>Brand: {product.brand}</span>
              </p>
              <p>
                <span>Description: {product.desc}</span>
              </p>
              <Price>${product.price}</Price>
              <PrimaryButton className="w-full h-[20%]" onClick={() => handleAddToCart(product)}>
                Add To Cart
              </PrimaryButton>
            </ProductDetails>
          </>
        )}
      </ProductsContainer>
    </StyledProduct>
  );
};

const StyledProduct = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media (min-width: 1068px) {
    margin: 3rem;
  }
`;

const ProductsContainer = styled.div`
  max-width: 500px;
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: rgba(100, 100, 111, 0.7) 0px 7px 29px 0px;
  border-radius: 5px;
  padding: 2rem;
  @media (min-width: 768px) {
    flex-direction: row;
    margin: 3rem;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    width: 100%;
  }
`;

const ProductDetails = styled.div`
  flex: 2;

  @media (min-width: 768px) {
    margin-left: 2rem;
  }
  h3 {
    font-size: 25px;
  }
  p span {
    font-weight: bold;
  }
`;

const Price = styled.p`
  margin: 1rem 0;
  font-weight: bold;
  font-size: 25px;
`;
