const ConfirmedBookings = ({orders}) => {
    return(<>
            <tbody>
                {orders.map((order,index) => (
                <tr id={index} className="text-center bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <th scope="row" className="px-2 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {order.orderId}
                    </th>
                    <td className="py-4 align-top max-w-[300px] px-3">
                        <div className="space-y-2">
                            {order.orderList.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-start text-left">
                                    <img
                                    src={item.product.image}
                                    alt="Product"
                                    className="w-10 h-10 object-cover flex-shrink-0"
                                    />
                                    <div className="text-sm text-gray-800 break-words">
                                    <p className="font-semibold">{item.product.name}</p>
                                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </td>
                    <td className="px-2 py-2">{order.email}</td>
                    <td className="px-2 py-2">Rs: {order.totalAmount.toFixed(2)}</td>
                    <td className="px-2 py-2 text-right">
                        <div className="flex justify-center">
                            <button className="hover:cursor-pointer text-green-400 hover:text-white border border-green-400 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-400 dark:focus:ring-green-600"
                                onClick={() => {approvalOrder(order.orderId)}}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-5 h-5" viewBox="0,0,256,256" fill="currentColor">
                                <g transform="scale(5.12,5.12)">
                                    <path d="M42.875,8.625c-0.03125,0.00781 -0.0625,0.01953 -0.09375,0.03125c-0.26172,0.06641 -0.48828,0.23438 -0.625,0.46875l-20.4375,31.6875l-14.0625,-12.6875c-0.24609,-0.3125 -0.65625,-0.44922 -1.04297,-0.34766c-0.38672,0.10156 -0.67187,0.42578 -0.73047,0.82031c-0.05859,0.39453 0.12109,0.78516 0.46094,0.99609l14.90625,13.5c0.21875,0.19141 0.51172,0.27734 0.80078,0.23438c0.28906,-0.04297 0.54297,-0.20703 0.69922,-0.45312l21.09375,-32.6875c0.23047,-0.32812 0.24219,-0.76172 0.03125,-1.10156c-0.21094,-0.33984 -0.60547,-0.51953 -1,-0.46094z" />
                                </g>
                                </svg>
                            </button>
                            <button className="hover:cursor-pointer text-red-400 hover:text-white border border-red-400 hover:bg-red-400 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-600">
                                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M 10 2 L 9 3 L 3 3 L 3 5 L 4.109375 5 L 5.8925781 20.255859 L 5.8925781 20.263672 C 6.023602 21.250335 6.8803207 22 7.875 22 L 16.123047 22 C 17.117726 22 17.974445 21.250322 18.105469 20.263672 L 18.107422 20.255859 L 19.890625 5 L 21 5 L 21 3 L 15 3 L 14 2 L 10 2 z M 6.125 5 L 17.875 5 L 16.123047 20 L 7.875 20 L 6.125 5 z"></path>
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
                ))}
            </tbody>
    </>)
}

export default ConfirmedBookings