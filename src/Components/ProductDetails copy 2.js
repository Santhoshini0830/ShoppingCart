import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Ratings } from "./Ratings";
import { PlaceOrder } from "./PlaceOrder";
import { NumberFormat } from "./NumberFormat";
import { AddToCart } from "./AddToCart";
import { AddToList } from "./AddToList";
import { RelatedProducts } from "./RelatedProducts";
import { SampleNextArrow, SamplePrevArrow } from "./SliderSlick";
import Stack from "@mui/material/Stack";
import {
  Card,
  Grid,
  Box,
  CardMedia,
  List,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import loader from "../images/loader.gif";
import { useQueryClient } from "react-query";

export const ProductDetails = ({ list, cart }) => {
  const { id } = useParams();

  const settings1 = {
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  const settings2 = {
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 510,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const queryClient = useQueryClient();
  const products = queryClient.getQueryData("products");
  const product = products && products.find((product) => product.id === id);

  // const product = products.find((products) => products.id == id);
  const {
    title,
    image,
    images,
    price,
    stars,
    specification,
    payment,
    services,
    highlights,
    description,
  } = product || {};

  const loginUserEmail = localStorage.getItem("userEmail");
  const recentProducts = JSON.parse(localStorage.getItem("userData"));
  const [previewImg, setPreviewImg] = useState(image);

  recentProducts.forEach((item) => {
    if (item.email === loginUserEmail) {
      if (!item.ide) {
        item.ide = []; // Initialize ide array if it doesn't exist
      }
      if (!item.ide.includes(id)) {
        item.ide.push(id);
      }
      return;
    }
  });

  localStorage.setItem("userData", JSON.stringify(recentProducts));

  const { ide } = recentProducts.find((e) => e.email === loginUserEmail) || {};
  // const ele = loginUserEmail ? ide.splice(-1) : "";

  const previouslyViewedProducts = ide
    ? products.filter((item) => ide.includes(`${item.id}`))
    : [];

  // const relatedTo = products.filter(
  //   (item) => item.category === product.category && item.id !== product.id
  // );
  const relatedTo =
    products &&
    product &&
    products.filter(
      (item) => item.category === product.category && item.id !== product.id
    );

  // const relatedTo =
  //   product &&
  //   products.filter(
  //     (item) => item.category === product.category && item.id !== product.id
  //   );

  useEffect(() => {
    setPreviewImg(image);
  }, [product, setPreviewImg, image]);

  return (
    <Box className="productDetails">
      <Box>
        {/* {Object.keys(product).length === 0 ? ( */}
        {product && Object.keys(product).length === 0 ? (
          <Box>
            <CardMedia
              component="img"
              image={loader}
              alt="loading..."
              sx={{
                height: "20px",
                width: "60px",
                margin: "auto",
              }}
            />
          </Box>
        ) : (
          <Grid
            container
            spacing={1}
            sx={{ ml: { xs: 0, sm: 0, md: 0, lg: -10 } }}
          >
            <Grid item>
              <Box
                id="slider1"
                sx={{
                  height: { xs: "50%", sm: "50%", md: "50%", lg: "50%" },
                  ml: { xs: -0 },
                }}
              >
                <Box>
                  <Slider {...settings1} className="slide">
                    {product &&
                      images.map((sliderImage) => (
                        <Box
                          className="items"
                          id="sliderImg"
                          onClick={() => setPreviewImg(sliderImage)}
                        >
                          <CardMedia
                            component="img"
                            image={sliderImage}
                            alt={title}
                            id="sliderImg1"
                          />
                        </Box>
                      ))}
                  </Slider>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              sx={{
                mt: { xs: -39.5, sm: -43.5, md: -43, lg: 5 },
                ml: { xs: 17, sm: 30, md: 30, lg: -10 },
              }}
            >
              <Box>
                <Card
                  variant="outlined"
                  sx={{
                    width: { xs: "95%", sm: "70%", md: "100%" },
                    border: "1px solid grey",
                  }}
                >
                  <Stack
                    sx={{ justifyContent: "flex-end" }}
                    spacing={0}
                    direction="row"
                  >
                    <AddToList
                      product={product}
                      title={product.title}
                      id={product.id}
                    />
                  </Stack>
                  <Box sx={{ width: { xs: "200%" } }}>
                    <TransformWrapper>
                      <TransformComponent>
                        <CardMedia
                          component="img"
                          image={previewImg}
                          alt={title}
                          sx={{
                            mt: { xs: "-18%", sm: "-5%", md: "0", lg: "-10%" },
                            ml: { xs: 3, sm: 5, md: 15 },
                            maxWidth: {
                              xs: "40%",
                              sm: "50%",
                              md: "50%",
                              lg: "50%",
                            },
                            display: "flex",

                            justifyContent: "center",
                            objectFit: "contain",
                            bgcolor: "transparent",
                            borderRadius: 0,
                            elevation: 0,
                            border: "none",
                            boxShadow: "none",
                          }}
                        />
                      </TransformComponent>
                    </TransformWrapper>
                  </Box>

                  <Box sx={{ pl: "" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        textAlign: "center",
                        mt: { xs: -7, sm: -2, md: 0 },
                      }}
                    >
                      {title}
                    </Typography>
                    <Typography variant="h5" sx={{ textAlign: "center" }}>
                      {NumberFormat(price)}
                    </Typography>
                    <Typography variant="body1" sx={{ textAlign: "center" }}>
                      <Ratings rating={stars} />
                    </Typography>
                  </Box>
                  <Stack
                    spacing={{ xs: 0.2, sm: 1, md: 3 }}
                    sx={{
                      ml: { xs: "4%", sm: "4.5%", md: "21%" },
                      mb: 1,
                      mr: { xs: 2.6, sm: 3.5 },
                    }}
                    direction="row"
                  >
                    <AddToCart
                      product={product}
                      title={product.title}
                      id={product.id}
                      // cart={cart}
                    />
                    <PlaceOrder product={product} />
                  </Stack>
                </Card>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={8}
              sx={{
                ml: { xs: 2, sm: 10, md: 6, lg: 115 },
                mt: { xs: 3, sm: 3, md: 3, lg: -70 },
                mr: { xs: 0, sm: 0, md: 5, lg: 0 },
              }}
            >
              <Box sx={{ mt: { xs: 2, sm: 2, md: 2, lg: 8 } }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{}}>
                    <Typography variant="p" gutterBottom fontWeight="bold">
                      Highlights
                    </Typography>
                    <List>
                      {highlights.map((bullet) => (
                        <ListItem key={bullet} sx={{ py: 0 }}>
                          <ListItemIcon
                            sx={{
                              fontSize: { xs: 20 },
                              color: "black",
                              mt: 0.5,
                              mb: 0,
                            }}
                          >
                            <span style={{ lineHeight: "0.7" }}>&#8226;</span>
                          </ListItemIcon>
                          <ListItemText
                            primary={bullet}
                            primaryTypographyProps={{
                              sx: {
                                fontSize: "0.9rem",
                                mt: 0,
                                mb: 0,
                                ml: { xs: -4 },
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                  <Box sx={{}}>
                    <Typography variant="p" gutterBottom fontWeight="bold">
                      Easy Payment Options
                    </Typography>

                    <List>
                      {payment.map((bullet) => (
                        <ListItem key={bullet} sx={{ py: 0 }}>
                          <ListItemIcon
                            sx={{
                              fontSize: 25,
                              color: "black",
                              mt: 0.5,
                              mb: 0,
                            }}
                          >
                            <span style={{ lineHeight: "0.7" }}>&#8226;</span>
                          </ListItemIcon>
                          <ListItemText
                            primary={bullet}
                            primaryTypographyProps={{
                              sx: { fontSize: "0.9rem", mt: 0, mb: 0, ml: -2 },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <Typography variant="b" gutterBottom fontWeight="bold">
                      Specifications
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{ mt: -1, mb: { xs: 0 } }}>
                    <Typography variant="p">{specification}</Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    mt: 1,
                  }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Typography variant="b" gutterBottom fontWeight="bold">
                        Description
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: { xs: 1, md: -7, lg: -2 } }}>
                      <Typography variant="p" sx={{ minHeight: 50 }}>
                        {description}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ ml: 5 }}>
                    <Typography variant="p" gutterBottom fontWeight="bold">
                      Services
                    </Typography>

                    <List>
                      {services.map((bullet) => (
                        <ListItem key={bullet} sx={{ py: 0 }}>
                          <ListItemIcon
                            sx={{
                              fontSize: 25,
                              color: "black",
                              mt: 0.5,
                              mb: 0,
                            }}
                          >
                            <span style={{ lineHeight: "0.7" }}>&#8226;</span>
                          </ListItemIcon>
                          <ListItemText
                            primary={bullet}
                            primaryTypographyProps={{
                              sx: { fontSize: "0.9rem", mt: 0, mb: 0, ml: -2 },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={10} md={11} lg={11.8} sx={{ mt: 2 }}>
              <Box>
                <Typography
                  sx={{ ml: { xs: 8, sm: 7, md: 8, lg: 18 } }}
                  variant="h6"
                  gutterBottom
                  fontWeight="bold"
                >
                  Similar Products
                </Typography>

                <Box sx={{ pt: 2, pl: { xs: 8, sm: 8, md: 8, lg: 18 } }}>
                  <Slider {...settings2}>
                    {relatedTo &&
                      relatedTo.map((product) => (
                        <RelatedProducts
                          id={product.id}
                          title={product.title}
                          image={product.image}
                          price={product.price}
                        />
                      ))}
                  </Slider>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={10} md={11} lg={11.8} sx={{ mt: 2 }}>
              <Box>
                {previouslyViewedProducts.length >= 1 && (
                  <Box>
                    <Typography
                      sx={{ ml: { xs: 8, sm: 7, md: 8, lg: 18 } }}
                      variant="h6"
                      gutterBottom
                      fontWeight="bold"
                    >
                      Previously Viewed Products
                    </Typography>

                    {previouslyViewedProducts.length <= 6 ? (
                      <Grid
                        container
                        sx={{
                          pl: { xs: 8, sm: 8, md: 8, lg: 18 },

                          display: "grid",
                          gridTemplateColumns: "repeat(6, 1fr)",
                          gridAutoFlow: "row dense",

                          overflow: "auto",
                        }}
                      >
                        {previouslyViewedProducts.map((product) => (
                          <Box key={product.id}>
                            <RelatedProducts
                              id={product.id}
                              title={product.title}
                              image={product.image}
                              price={product.price}
                            />
                          </Box>
                        ))}
                      </Grid>
                    ) : (
                      <Box>
                        <Box
                          sx={{
                            pt: 2,
                            pl: { xs: 8, sm: 8, md: 8, lg: 18 },
                            mb: 2,
                          }}
                        >
                          <Slider {...settings2} className="slides">
                            {previouslyViewedProducts.map((product) => (
                              <RelatedProducts
                                id={product.id}
                                title={product.title}
                                image={product.image}
                                price={product.price}
                              />
                            ))}
                          </Slider>
                        </Box>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};
