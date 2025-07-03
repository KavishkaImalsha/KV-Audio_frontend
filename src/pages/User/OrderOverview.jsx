const OrderOverview = ({orders}) => {
    return(<>
        <div>
            {orders.map((order, index) => {
                return(
                    <div key={index} className="m-5 border border-gray-300 rounded-xl">
                        <div className="bg-gray-100 h-[20%] rounded-t-xl grid grid-cols-5 text-center">
                            <div className="pt-5"><span className="text-gray-600 block">Order Placed</span><p className="font-semibold">{new Date(order.orderDate).toISOString().split('T')[0]}</p></div>
                            <div className="pt-5"><span className="text-gray-600 block">Total</span><p className="font-semibold">Rs. {order.totalAmount.toFixed(2)}</p></div>
                            <div className="pt-5"><span className="text-gray-600 block">Order Status</span><p className="font-semibold text-yellow-600">{order.isApproval ? "Approved" : "Pending"}</p></div>
                            <div className="col-span-2 pt-5">
                                <span className="text-gray-600 block">Order ID</span>
                                <p className="font-semibold">{order.orderId}</p>
                            </div>
                        </div>
                        <div>
                            {
                            order.orderList.map((product, index) => {
                                return(
                                    <div className="flex">
                                        <div key={index } className="mx-15 my-2 w-24 h-24 border-0 border-gray-400 rounded flex justify-center items-center">
                                            <img src={product.product.image} alt="Product Image" className="bg-cover bg-no-repeat bg-center"/>
                                        </div>
                                        <div>
                                            <h1 className="mt-2 font-semibold">{product.product.name}</h1>
                                            <ul className="text-gray-400">
                                                <li>Qty : {product.quantity}</li>
                                            </ul>
                                        </div>
                                    </div>

                                )
                            })
                        }
                        </div>
                    </div>
                )
            })}
        </div>
    </>)
}

export default OrderOverview