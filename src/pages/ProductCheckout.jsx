import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Button,
  Box,
  TextField,
  Divider,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  fetchCart,
  increamentQuantity,
  removeItemFromCart,
} from "../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductCheckout = () => {
  // const handleApplyCoupon = () => {
  //   if (coupon === "DISCOUNT10") {
  //     setDiscount(10);
  //   } else {
  //     setDiscount(0);
  //   }
  // };
  // const [coupon, setCoupon] = useState("");
  // const [discount, setDiscount] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  useEffect(() => {
    fetchCart(dispatch);
  }, []);
  console.log("cart store", cart);

  const handleDecrementQuantity = (productId, quantity) => {
    console.log("quantity", quantity, productId);
    dispatch(decrementQuantity(productId, quantity));
  };

  const handleIncrementQuantity = (productId, quantity) => {
    console.log("quantity", quantity, productId);
    dispatch(increamentQuantity(productId, quantity));
  };
  const handleRemoveItem = (productId) => {
    console.log("quantity", productId);
    toast.success("Product removed from cart!", {
      position: "top-right",
      autoClose: 2000, // Close the toast after 3 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    dispatch(removeItemFromCart(productId));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };
  const handleChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <Container maxWidth="xl">
      <div className="py-8">
        {cart?.items?.length > 0 ? (
          <Typography
            variant="h4"
            className="font-bold tracking-tight text-gray-900 mb-8 py-4"
          >
            Shopping Cart
          </Typography>
        ) : (
          <div>
            <img src="/public/cartFound1.jpg" alt="image" className="mx-auto w-64" />
            <Typography
              className="font-bold tracking-tight text-gray-900 mb-8 py-4"
              variant="h4"
            >
              Oops!! No Items in your cart
            </Typography>
          </div>
        )}

        {cart?.items?.length > 0 ? (
          <Grid container spacing={4}>
            {/* Cart Items */}
            <Grid item xs={12} lg={8}>
              <Card variant="outlined" className="rounded-lg">
                <CardContent className="shadow-2xl">
                  (
                  <Typography variant="srOnly" id="cart-heading">
                    Items in your shopping cart
                  </Typography>
                  )
                  {cart?.items?.map((product) => (
                    <div
                      key={product._id}
                      className="flex items-center justify-between flex-row py-4 border-b border-gray-200"
                    >
                      <div className="flex flex-row">
                        <CardMedia
                          sx={{ height: "100px", width: "100px" }}
                          component="img"
                          image={product.productId.image}
                          alt={product.productId.name}
                          className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
                        />
                        <div className="p-4 ml-3">
                          <Typography variant="h6">
                            <a
                              href={product.href}
                              className="font-semibold text-black"
                            >
                              {product.name}
                            </a>
                          </Typography>
                          <Typography
                            variant="body2"
                            className="text-gray-500 mt-1"
                          >
                            {product.color}
                            {product.size && (
                              <span className="border-l border-gray-200 pl-4 ml-4">
                                {product.size}
                              </span>
                            )}
                          </Typography>
                          <div className="flex items-center mt-2">
                            <Typography
                              variant="body2"
                              className="line-through text-xs text-gray-500"
                            >
                              ${product.originalPrice}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-sm font-medium text-gray-900 ml-2"
                            >
                              ${product.price}
                            </Typography>
                            <Typography
                              variant="body2"
                              className="text-sm font-medium text-green-500 ml-2"
                            >
                              {product.discount}
                            </Typography>
                          </div>
                        </div>
                      </div>
                      <div className="flex mt-2 items-center">
                        <IconButton
                          size="small"
                          onClick={() =>
                            handleDecrementQuantity(
                              product.productId._id,
                              product.quantity - 1
                            )
                          }
                        >
                          <Remove color="primary" />
                        </IconButton>
                        <TextField
                          type="number"
                          variant="standard"
                          size="small"
                          value={product.quantity}
                          inputProps={{ min: 1 }}
                          className="mx-2 w-16 text-center"
                        />

                        <IconButton
                          size="small"
                          onClick={() =>
                            handleIncrementQuantity(
                              product.productId._id,
                              product.quantity + 1
                            )
                          }
                        >
                          <Add color="primary" />
                        </IconButton>
                        <Button
                          onClick={() =>
                            handleRemoveItem(product.productId._id)
                          }
                          variant="text"
                          color="error"
                          startIcon={<Delete />}
                          className="text-xs ml-4"
                        ></Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </Grid>

            {/* Order Summary */}

            <Grid item xs={12} lg={4}>
              <Card variant="outlined" className="rounded-lg">
                <CardContent>
                  <Typography
                    variant="h6"
                    id="summary-heading"
                    className="border-b border-gray-200 pb-2"
                  >
                    Price Details
                  </Typography>
                  <div className="space-y-2 mt-4">
                    <div className="flex justify-between">
                      <Typography
                        variant="body2"
                        className="text-sm text-gray-800"
                      >
                        Price ({cart?.items?.length} items)
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-sm font-medium text-gray-900"
                      >
                        $ {cart?.totalPrice?.toFixed(2)}
                      </Typography>
                    </div>
                    {/* <Box display="flex" alignItems="center" mt={2} mb={2}>
                    <TextField
                      label="Coupon Code"
                      variant="outlined"
                      size="small"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      fullWidth
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleApplyCoupon}
                      style={{ marginLeft: 8 }}
                    >
                      Apply
                    </Button>
                  </Box> */}
                    <div className="flex justify-between">
                      <Typography
                        variant="body2"
                        className="text-sm text-gray-800"
                      >
                        Discount
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-sm font-medium text-green-700"
                      >
                        - $10
                      </Typography>
                    </div>
                    <div className="flex justify-between">
                      <Typography
                        variant="body2"
                        className="text-sm text-gray-800"
                      >
                        Delivery Charges
                      </Typography>
                      <Typography
                        variant="body2"
                        className="text-sm font-medium text-green-700"
                      >
                        Free
                      </Typography>
                    </div>
                    <Divider />
                    <div className="flex justify-between py-2">
                      <Typography
                        variant="body1"
                        className="text-base font-medium text-gray-900"
                      >
                        Total Amount
                      </Typography>
                      <Typography
                        variant="body1"
                        className="text-base font-medium text-gray-900"
                      >
                        ${(cart?.totalPrice - 10).toFixed(2)}
                      </Typography>
                    </div>
                  </div>
                  <Typography variant="body2" className="pt-2 text-green-700">
                    You will save $10 on this order
                  </Typography>
                </CardContent>
                <Button
                  variant="outlined"
                  color="inherit"
                  style={{ marginBottom: "1rem", width: "80%" }}
                  onClick={() => handleCheckout()}
                >
                  Checkout
                </Button>
              </Card>
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
      </div>
    </Container>
  );
};

export default ProductCheckout;
