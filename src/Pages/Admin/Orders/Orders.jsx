import styled from "styled-components";
import OredersList from "./OredersList";

export const Orders = () => {
  return (
    <div>
      {product.map((procut) => (
        <div>{procut}</div>
      ))}
      <OredersList />
    </div>
  );
};

const View = styled.button`
  background-color: rgb(114, 225, 40);
`;
