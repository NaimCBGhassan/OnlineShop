export const CartRow = ({ item }) => {
  console.log(item);
  return (
    <>
      <tbody className="">
        <tr>
          <td>
            <img src={item.image.url} alt={item.name} className="h-[100px]" />
            <span className="text-base">{item.name}</span>
            <span className="text-sm">{item.desc}</span>
            <button className="text-xs bg-transparent border-none cursor-pointer">Remove</button>
          </td>
          <td>${item.price}</td>
          <td>{item.cartQuantity}</td>
          <td>${item.price * item.cartQuantity}</td>
        </tr>
      </tbody>
    </>
  );
};
