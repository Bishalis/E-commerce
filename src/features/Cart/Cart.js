import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteItemAsync,
  selectCartLoaded,
} from "./CartSlice";
import { Link } from "react-router-dom";
import { selectItems } from "./CartSlice";
import { updateItemAsync } from "./CartSlice";
import { Navigate } from "react-router-dom";
import { discountedPrice } from "../../app/constants";
import { toast } from "react-toastify";

export function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);

  const totalAmount = items.reduce(
    (amount, item) => discountedPrice(item.product) * item.quantity +  amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ id: item.id, quantity: +e.target.value }));
  };
  const handleRemove = (e, id) => {
    toast.error("item removed")
    dispatch(deleteItemAsync(id));
  };

  return (
    <>
      {!items.length && cartLoaded && <Navigate to="/" replace={true} />}
      <div className="mx-auto max-w-5xl px-2 lg:px-8 bg-gray border-2 mt-10 p-5">
        <h2 className="text-4xl font-bold m-10">Cart</h2>
        <div className="mt-8 w-full">
          <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200 mx-auto max-w-7xl  sm:px-6 lg:px-8  ">
              {items.map((item, idx) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 ">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.href}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${item.product.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.product.brand}
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex ">
                        <label
                          className="text-black-500 font-bold text-xl  flex flex-col"
                          htmlFor="quantity"
                        >
                          Qty
                        </label>
                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.product.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                        </select>
                      </div>

                      <div className="flex ">
                        <button
                          onClick={(e) => handleRemove(e, item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8 my-10 ">
          <div className=" flex justify-between text-base font-medium text-gray-900 my-5">
            <p>Shipping Amount(discount)</p>
            <p>${totalAmount}</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900 my-5">
            <p>Total items count</p>
            <p>{totalItems > 0 && totalItems} items</p>
          </div>

          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500 max-w-7xl">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
