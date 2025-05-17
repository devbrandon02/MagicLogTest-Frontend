import { Button, Card, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React from 'react'

type Product = {
  id: string | number;
  name: string;
  price: number;
  // add other fields as needed
};

type GridProductsProps = {
  products: Product[];
};

const GridProducts: React.FC<GridProductsProps> = ({ products }) => {
  return (
    <Grid templateColumns={["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"]} gap="6">
      {products?.map((product) => (
        <GridItem key={product.id}>
          <Card.Root maxW="sm" overflow="hidden">
            <Image
              src="https://inoticias.cl/www_inoticias_cl/images/sinimagen.jpg"
              alt="Green double couch with wooden legs"
            />
            <Card.Body gap="2">
              <Card.Title>{product.name}</Card.Title>
              <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                ${product.price}
              </Text>
            </Card.Body>
            <Card.Footer gap="2">
              <Button variant="solid">Buy now</Button>
              <Button variant="ghost">Add to cart</Button>
            </Card.Footer>
          </Card.Root>
        </GridItem>
      ))}
    </Grid>
  )
}

export default GridProducts