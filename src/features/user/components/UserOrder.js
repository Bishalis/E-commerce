import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLoggedInOrderAsync, selectUserOrders } from "../UserSlice";
import { selectLoggedInUser } from "../../auth/authSlice";
import { Link, Navigate } from "react-router-dom";

export function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserLoggedInOrderAsync(user.id));
  }, []);

  return (
    <div>
    {!user && <Navigate to="/login" replace={true} />}
    {orders.map((order) => (
          <div key={order.id} className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white">
          <h2 className="text-4xl font-bold m-10">Order Number :{order.id}</h2>
          <div className="mt-8 ">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((product,idx) => (
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
                        </div>
    
                        <div className="flex">
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
              <p>${order.totalAmount}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900 my-5">
              <p>Total items count</p>
              <p>{order.totalItems > 0 && order.totalItems} items</p>
            </div>
    
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping Address:
            </p>
          </div>

          <div role="list" className="divide-y divide-gray-100">
                {order.user.addresses.map((address, index) => (
                  <div key={order.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4 ">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.email}
                        </p>
                      </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {address.state}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {address.postCode}
                      </p>
                    </div>
                  </div>
                
                ))}
           </div>
        </div>
        
    ))}
      
  </div>
);
}
