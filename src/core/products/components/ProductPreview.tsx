import { Box, Badge } from "@chakra-ui/react";
import Image from "next/image";

import { Product } from "../types";

interface ProductPreviewProps {
  data: Pick<Product, "title" | "images" | "price">;
}

export default function ProductPreview({ data }: ProductPreviewProps) {
  return (
    <Box
      height="350px"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="sm"
      d="flex"
      flexDir="column"
    >
      <Box flex="2" position="relative">
        <Image
          src={data.images[0]}
          alt={data.title}
          objectFit="cover"
          layout="fill"
        />
      </Box>
      <Box p="6">
        <Box display="flex" alignItems="baseline">
          <Badge borderRadius="full" px="2" colorScheme="teal">
            New
          </Badge>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {data.title}
        </Box>

        <Box>{data.price} usd</Box>
      </Box>
    </Box>
  );
}
