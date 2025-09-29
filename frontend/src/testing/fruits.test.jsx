import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Fruits from "../Components/Fruits";

// Mock useNavigate and Link, but keep everything else from react-router-dom intact
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

const mockNavigate = vi.fn();
const handleAddToWishlist = vi.fn();
const handleRemoveFromWishlist = vi.fn();

// Mock useWishlistActions hook
vi.mock("../Hooks/useWishlistActions.js", () => {
  return {
    default: () => ({
      handleAddToWishlist,
      handleRemoveFromWishlist,
    }),
  };
});

describe("Fruits Component", () => {
  const mockProduct = {
    _id: "68a19d34a86cd71d764dd2a4",
    name: "Apple",
    image: ["/Fruits/Apple.jpeg"],
    category: "Fresh Fruit",
    weight: "500g",
    price: "11.75",
    rating: 4.7,
  };

  const mockWishlistItemsWithProduct = {
    wishList: {
      products: [{ productID: "68a19d34a86cd71d764dd2a4" }], // product is in wishlist
    },
  };

  const mockWishlistItemsEmpty = {
    wishList: {
      products: [], // empty wishlist
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("displays 5 items per row on large screens", () => {
  const products = Array.from({ length: 22 }, (_, i) => ({
    ...mockProduct,
    _id: `product-${i}`,
    name: `Product ${i + 1}`,
  }));

  render(
    <MemoryRouter>
      {products.map((p) => (
        <Fruits key={p._id} product={p} />
      ))}
    </MemoryRouter>
  );

  const fruitItems = screen.getAllByTestId("fruit-item");
  expect(fruitItems).toHaveLength(22);

  // Optional: just check slices for row assumptions
  expect(fruitItems.slice(0, 5)).toHaveLength(5);
  expect(fruitItems.slice(5, 10)).toHaveLength(5);
  expect(fruitItems.slice(10, 15)).toHaveLength(5);
  expect(fruitItems.slice(15, 20)).toHaveLength(5);
  expect(fruitItems.slice(20, 22)).toHaveLength(2);
});

 it("displays 4 itmes per row on medium screens",()=>{
  const products = Array.from({length: 22}, (_,i)=>({
    ...mockProduct,
    _id:`product-${i}`,
    name:`product ${i+1}`
  }));

  render(
    <MemoryRouter>
      {products.map((p) => (
        <Fruits key={p._id} product={p} />
      ))}
    </MemoryRouter>
  )
  const fruitItems = screen.getAllByTestId("fruit-item");
  expect(fruitItems).toHaveLength(22);

  // Optional: just check slices for row assumptions
  expect(fruitItems.slice(0,4)).toHaveLength(4);
  expect(fruitItems.slice(4,8)).toHaveLength(4);
  expect(fruitItems.slice(8,12)).toHaveLength(4);
  expect(fruitItems.slice(12,16)).toHaveLength(4);
  expect(fruitItems.slice(16,20)).toHaveLength(4);
  expect(fruitItems.slice(20,22)).toHaveLength(2);
 });


 it("displays 3 items per row on small screens",() => {
  const products = Array.from({length:22},(_,i)=>({
    ...mockProduct,
    _id:`product-${i}`,
    name:`product ${i+1}`
  }));

  render(
    <MemoryRouter>
      {products.map((p)=>(<Fruits key={p._id} product={p} />))}
    </MemoryRouter>
  );

  const fruitItems = screen.getAllByTestId("fruit-item");
  expect(fruitItems).toHaveLength(22);

  // Optional: just check slices for row assumptions
  expect(fruitItems.slice(0,3)).toHaveLength(3);
  expect(fruitItems.slice(3,6)).toHaveLength(3);
  expect(fruitItems.slice(6,9)).toHaveLength(3);
  expect(fruitItems.slice(9,12)).toHaveLength(3);
  expect(fruitItems.slice(12,15)).toHaveLength(3);
  expect(fruitItems.slice(15,18)).toHaveLength(3);
  expect(fruitItems.slice(18,21)).toHaveLength(3);
  expect(fruitItems.slice(21,22)).toHaveLength(1);
 });

 it("displays 1 item per row on mobile screens",()=>{
  const prodoucts = Array.from({length:22},(_,i)=>({
    ...mockProduct,
    _id:`product-${i}`,
    name:`product ${i+1}`
  }));

  render(
    <MemoryRouter>
      {prodoucts.map((p)=>(<Fruits key={p._id} product={p}/>))}
    </MemoryRouter>
  );

  const fruitItems = screen.getAllByTestId("fruit-item");
  expect(fruitItems).toHaveLength(22);
  // Optional: just check slices for row assumptions
  expect(fruitItems.slice(0,1)).toHaveLength(1);
  expect(fruitItems.slice(1,2)).toHaveLength(1);
  expect(fruitItems.slice(2,3)).toHaveLength(1);
  expect(fruitItems.slice(3,4)).toHaveLength(1);
  expect(fruitItems.slice(4,5)).toHaveLength(1);
  expect(fruitItems.slice(5,6)).toHaveLength(1);
  expect(fruitItems.slice(6,7)).toHaveLength(1);
  expect(fruitItems.slice(7,8)).toHaveLength(1);
  expect(fruitItems.slice(8,9)).toHaveLength(1);
  expect(fruitItems.slice(9,10)).toHaveLength(1);
  expect(fruitItems.slice(10,11)).toHaveLength(1);
  expect(fruitItems.slice(11,12)).toHaveLength(1);
  expect(fruitItems.slice(12,13)).toHaveLength(1);
  expect(fruitItems.slice(13,14)).toHaveLength(1);
  expect(fruitItems.slice(15,16)).toHaveLength(1);
  expect(fruitItems.slice(16,17)).toHaveLength(1);
  expect(fruitItems.slice(18,19)).toHaveLength(1);
  expect(fruitItems.slice(19,20)).toHaveLength(1);
  expect(fruitItems.slice(20,21)).toHaveLength(1);
  expect(fruitItems.slice(21,22)).toHaveLength(1);
  
 })

  it("renders fruit item container with correct testid", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );
    const fruitItem = screen.getByTestId("fruit-item");
    expect(fruitItem).toBeInTheDocument();
  });

  it("displays 25% off label", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText(/25% off/i)).toBeInTheDocument();
  });

  it("renders image with correct alt and src", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );
    const img = screen.getByAltText(mockProduct.name);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockProduct.image[0]);
  });

  it("shows category and rating", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText("⭐")).toBeInTheDocument();
    expect(screen.getByText(String(mockProduct.rating))).toBeInTheDocument();
  });

  it("shows fruit name as link to product details page", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );
    const link = screen.getAllByRole("link").find((link) =>
      link.textContent.includes(mockProduct.name)
    );
    expect(link).toHaveAttribute("href", `/productDetailsPage/${mockProduct._id}`);
  });

  it("shows weight and price correctly", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );
    expect(screen.getByText(mockProduct.weight)).toBeInTheDocument();
    expect(screen.getByText(`₹${mockProduct.price}`)).toBeInTheDocument();
  });

  it("renders Add button and calls navigate on click", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );

    const addButton = screen.getByRole("button", { name: /add/i });
    fireEvent.click(addButton);

    expect(mockNavigate).toHaveBeenCalledWith(`/productDetailsPage/${mockProduct._id}`);
  });

  it("calls handleRemoveFromWishlist if product is in wishlist and heart clicked", () => {
    render(
      <MemoryRouter>
        <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
      </MemoryRouter>
    );

    const heartButtons = screen.getAllByRole("button", { hidden: true });
    const heartButton = heartButtons.find(
    (btn) =>
      btn.className.includes("text-red-500") ||
      btn.className.includes("text-gray-400")
  );
    fireEvent.click(heartButton);

    expect(handleRemoveFromWishlist).toHaveBeenCalledWith(mockProduct._id);
    expect(handleAddToWishlist).not.toHaveBeenCalled();
  });

 it("calls handleAddToWishlist if product NOT in wishlist and heart clicked", () => {
  render(
    <MemoryRouter>
      <Fruits product={mockProduct} wishListItems={mockWishlistItemsEmpty} />
    </MemoryRouter> 
  );

  const heartButtons = screen.getAllByRole("button", { hidden: true });
  const heartButton = heartButtons.find(
    (btn) =>
      btn.className.includes("text-red-500") ||
      btn.className.includes("text-gray-400")
  );

  fireEvent.click(heartButton);

  expect(handleAddToWishlist).toHaveBeenCalledWith(mockProduct);
  expect(handleRemoveFromWishlist).not.toHaveBeenCalled();
});


  it("wishlist heart button has red color if item in wishlist", () => {
  render(
    <MemoryRouter>
      <Fruits product={mockProduct} wishListItems={mockWishlistItemsWithProduct} />
    </MemoryRouter>
  );
  const heartButtons = screen.getAllByRole("button", { hidden: true });
  const heartButton = heartButtons.find((btn) =>
    btn.className.includes("text-red-500") || btn.className.includes("text-gray-400")
  );
  expect(heartButton).toBeDefined();
  expect(heartButton.className).toContain("text-red-500");
});

it("wishlist heart button has gray color if item NOT in wishlist", () => {
  render(
    <MemoryRouter>
      <Fruits product={mockProduct} wishListItems={mockWishlistItemsEmpty} />
    </MemoryRouter>
  );
  const heartButtons = screen.getAllByRole("button", { hidden: true });
  const heartButton = heartButtons.find((btn) =>
    btn.className.includes("text-gray-400") || btn.className.includes("text-red-500")
  );
  expect(heartButton).toBeDefined();
  expect(heartButton.className).toContain("text-gray-400");
});
});
