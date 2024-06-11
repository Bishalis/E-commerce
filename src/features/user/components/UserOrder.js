import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLoggedInOrderAsync, selectUserOrders } from "../UserSlice";
import { discountedPrice } from "../../../app/constants";
import { Navigate } from "react-router-dom";

export function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    dispatch(fetchUserLoggedInOrderAsync());
  }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white mt-16 mb-10 ">
    {!orders&& <Navigate to="/" replace={true} />}
    {orders && orders.map((order) => (
          <div key={order.id} className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-white border-solid border-2 border-blue-50 ">
          <h2 className="text-4xl font-bold m-10">Order Number :{order.id}</h2>
          <div className="mt-8 ">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((item,idx) => (
                  <li key={item.product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                          <p className="ml-4">{discountedPrice(item.product)}</p>
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
    
          <div className="mx-auto max-w-7xl  lg:px-8">
            <div className=" flex justify-between text-base font-medium text-gray-900 my-5 w-full ">
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
                {order.selectedAddress.map((address, index) => (
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
                        {address.pinCode}
                      </p>
                      <p className="text-sm leading-6 text-gray-900">
                        {address.street}
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
