import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { deleteItemAsync, increment, incrementAsync, selectCount } from "./CartSlice";
import { Link } from "react-router-dom";
import { selectItems } from "./CartSlice";
import { updateItemAsync } from "./CartSlice";
import { Navigate } from "react-router-dom";

export function Cart() {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const totalAmount = items.reduce(
    (amount, item) => item.price * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);

  const handleQuantity = (e, item) => {
    dispatch(updateItemAsync({ ...item, quantity: +e.target.value }));
  };
  const handleRemove = (e,id)=>{
  dispatch( deleteItemAsync(id))
  }

  return (
    <>
      {!items.length && <Navigate to='/' replace={true}/>}
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-4xl font-bold m-10">Cart</h2>
      <div className="mt-8 ">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {items.map((product,idx) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.title}</a>
                      </h3>
                      <p className="ml-4">{product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.brand}
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
                        onChange={(e) => handleQuantity(e, product)}
                        value={product.quantity}
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                      </select>
                    </div>

                    <div className="flex">
                      <button
                      onClick={e=> handleRemove(e,product.id)}
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

      <div className="mx-auto max-w-7xl  sm:px-6 lg:px-8 my-10">
        <div className=" flex justify-between text-base font-medium text-gray-900 my-5">
          <p>Shipping Amount</p>
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
